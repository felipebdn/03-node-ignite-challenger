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
      name: 'Felipe',
      organization: 'Dev pet',
      email: 'teste@example.com',
      number: '1370',
      road: 'nova prata',
      sector: 'alto parana',
      state: 'PA',
      city: 'Redenção',
      cep: 84874000,
      whatsapp: '(94) 99148-7963',
      password_hash: await hash('123456', 6),
    })
    await inMemoryPetsRepository.create({
      name: 'Felipe',
      energy_level: 4,
      size: 'small',
      age: 'adolescent',
      description: 'z.string()',
      independence: 'medium',
      environment: 'Lugares fechados',
      org_id: org.id,
      requirements: 'cuidado',
    })
    const { id } = await inMemoryPetsRepository.create({
      name: 'Felipe',
      energy_level: 4,
      size: 'small',
      age: 'adolescent',
      description: 'z.string()',
      independence: 'medium',
      environment: 'Lugares fechados',
      org_id: org.id,
      requirements: 'cuidado',
    })

    const data = await sut.execute(id)

    expect(data?.pet).toEqual({
      name: 'Felipe',
      energy_level: 4,
      size: 'small',
      age: 'adolescent',
      description: 'z.string()',
      independence: 'medium',
      environment: 'Lugares fechados',
      requirements: 'cuidado',
      org_id: org.id,
      id: expect.any(String),
    })
  })
})
