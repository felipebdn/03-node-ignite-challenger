import { InMemoryImagesRepository } from '@/repositories/in-memory/in-memory-images-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { GetInfoPetUseCase } from '@/use-cases/get-info-pet'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

let inMemoryPetsRepository: InMemoryPetsRepository
let inMemoryImagesRepository: InMemoryImagesRepository
let inMemoryOrgsRepository: InMemoryOrgsRepository
let sut: GetInfoPetUseCase

describe('Pets Get Info Pet Use Case', () => {
  beforeEach(async () => {
    inMemoryPetsRepository = new InMemoryPetsRepository()
    inMemoryImagesRepository = new InMemoryImagesRepository()
    inMemoryOrgsRepository = new InMemoryOrgsRepository()
    sut = new GetInfoPetUseCase(
      inMemoryPetsRepository,
      inMemoryImagesRepository,
      inMemoryOrgsRepository,
    )
  })
  it('should be able to get info of pet', async () => {
    const org = await inMemoryOrgsRepository.create({
      name: 'example',
      organization: 'example',
      email: 'teste@example.com',
      number: '1370',
      road: 'example road',
      sector: 'example sector',
      state: 'PA',
      city: 'city example',
      cep: 12345678,
      whatsapp: '12345678910',
      password_hash: await hash('123456', 6),
    })
    await inMemoryPetsRepository.create({
      name: 'example',
      energy_level: 4,
      size: 'small',
      age: 'adolescent',
      description: 'example',
      independence: 'medium',
      environment: 'example',
      org_id: org.id,
      requirements: 'example',
    })
    const { id } = await inMemoryPetsRepository.create({
      name: 'example',
      energy_level: 4,
      size: 'small',
      age: 'adolescent',
      description: 'example',
      independence: 'medium',
      environment: 'example',
      org_id: org.id,
      requirements: 'example',
    })

    const data = await sut.execute(id)

    expect(data?.pet).toEqual({
      name: 'example',
      energy_level: 4,
      size: 'small',
      age: 'adolescent',
      description: 'example',
      independence: 'medium',
      environment: 'example',
      requirements: 'example',
      org_id: org.id,
      id: expect.any(String),
    })
  })
})
