import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { FetchPetsAroundCityUseCase } from '@/use-cases/search-pets'

let inMemoryOrgsRepository: InMemoryOrgsRepository
let inMemoryPetsRepository: InMemoryPetsRepository
let sut: FetchPetsAroundCityUseCase

describe('Pets Search Use Case', () => {
  beforeEach(async () => {
    inMemoryOrgsRepository = new InMemoryOrgsRepository()
    inMemoryPetsRepository = new InMemoryPetsRepository()
    sut = new FetchPetsAroundCityUseCase(
      inMemoryPetsRepository,
      inMemoryOrgsRepository,
    )

    await inMemoryOrgsRepository.create({
      id: 'org-01',
      name: 'example 1',
      organization: 'example 1',
      email: 'test@example.com',
      state: 'PA',
      number: '1234',
      road: 'example road',
      sector: 'example sector',
      city: 'city example',
      cep: 12345678,
      whatsapp: '12345678910',
      password_hash: await hash('123456', 6),
    })
    await inMemoryOrgsRepository.create({
      id: 'org-021',
      name: 'example 1',
      organization: 'example 1',
      email: 'test1@example.com',
      state: 'PA',
      number: '1234',
      road: 'example road',
      sector: 'example sector',
      city: 'city example',
      cep: 12345678,
      whatsapp: '12345678910',
      password_hash: await hash('123456', 6),
    })
  })
  it('should be able to search pets', async () => {
    const org_id_01 = await inMemoryOrgsRepository.create({
      name: 'example 1',
      organization: 'teste 1',
      email: 'teste@example.com',
      state: 'PA',
      number: '1234',
      road: 'example road',
      sector: 'example sector',
      city: 'Redenção',
      cep: 84874000,
      whatsapp: '12345678910',
      password_hash: await hash('123456', 6),
    })
    const org_id_02 = await inMemoryOrgsRepository.create({
      name: 'example 1',
      organization: 'teste 1',
      email: 'teste@example.com',
      state: 'PA',
      number: '1234',
      road: 'example road',
      sector: 'example sector',
      city: 'city example',
      cep: 84874000,
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
      org_id: org_id_01.id,
      requirements: 'example',
    })
    await inMemoryPetsRepository.create({
      name: 'example',
      energy_level: 5,
      size: 'medium',
      age: 'cub',
      description: 'example',
      independence: 'medium',
      environment: 'example',
      org_id: org_id_01.id,
      requirements: 'example',
    })

    await inMemoryPetsRepository.create({
      name: 'example',
      energy_level: 4,
      size: 'small',
      age: 'adolescent',
      description: 'example',
      independence: 'medium',
      environment: 'example',
      org_id: org_id_02.id,
      requirements: 'example',
    })
    await inMemoryPetsRepository.create({
      name: 'example',
      energy_level: 5,
      size: 'medium',
      age: 'cub',
      description: 'example',
      independence: 'medium',
      environment: 'example',
      org_id: org_id_02.id,
      requirements: 'example',
    })

    const data = await sut.execute({
      city: 'city example',
      state: 'PA',
      energy_level: 5,
    })

    expect(data?.pets).toEqual([
      expect.objectContaining({
        name: 'example',
        energy_level: 5,
        size: 'medium',
        age: 'cub',
        description: 'example',
        independence: 'medium',
        environment: 'example',
        org_id: expect.any(String),
      }),
    ])
  })
})
