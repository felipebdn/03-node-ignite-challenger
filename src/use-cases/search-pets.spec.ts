import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { FetchPetsAroundCityUseCase } from './search-pets'

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
      name: 'Felipe 1',
      organization: 'ze prequete 1',
      email: 'test@example.com',
      state: 'PA',
      city: 'Conceição do Araguaia',
      cep: 68552140,
      whatsapp: '(94) 99148-7963',
      password_hash: await hash('123456', 6),
    })
    await inMemoryOrgsRepository.create({
      id: 'org-021',
      name: 'Felipe 1',
      organization: 'ze prequete 1',
      email: 'test1@example.com',
      state: 'PA',
      city: 'Conceição do Araguaia',
      cep: 68552140,
      whatsapp: '(94) 99148-7963',
      password_hash: await hash('123456', 6),
    })
  })
  it('should be able to search pets', async () => {
    // create org
    const org_id_01 = await inMemoryOrgsRepository.create({
      name: 'Felipe 1',
      organization: 'teste 1',
      email: 'teste@example.com',
      state: 'PA',
      city: 'Redenção',
      cep: 84874000,
      whatsapp: '(94) 99148-7963',
      password_hash: await hash('123456', 6),
    })
    const org_id_02 = await inMemoryOrgsRepository.create({
      name: 'Felipe 1',
      organization: 'teste 1',
      email: 'teste@example.com',
      state: 'PA',
      city: 'Conceição do Araguaia',
      cep: 84874000,
      whatsapp: '(94) 99148-7963',
      password_hash: await hash('123456', 6),
    })

    // create pets from org_id_01
    await inMemoryPetsRepository.create({
      collar: '1',
      name: 'Felipe',
      energy_level: 4,
      size: 'small',
      age: 'adolescent',
      description: 'z.string()',
      independence: 'medium',
      anvironment: 'Lugares fechados',
      org_id: org_id_01.id,
    })
    await inMemoryPetsRepository.create({
      collar: '2',
      name: 'Felipe',
      energy_level: 5,
      size: 'medium',
      age: 'cub',
      description: 'z.string()',
      independence: 'medium',
      anvironment: 'Lugares fechados',
      org_id: org_id_01.id,
    })

    // create pets from org_id_02
    await inMemoryPetsRepository.create({
      collar: '3',
      name: 'Felipe',
      energy_level: 4,
      size: 'small',
      age: 'adolescent',
      description: 'z.string()',
      independence: 'medium',
      anvironment: 'Lugares fechados',
      org_id: org_id_02.id,
    })
    await inMemoryPetsRepository.create({
      collar: '4',
      name: 'Felipe',
      energy_level: 5,
      size: 'medium',
      age: 'cub',
      description: 'z.string()',
      independence: 'medium',
      anvironment: 'Lugares fechados',
      org_id: org_id_02.id,
    })

    const data = await sut.execute({
      city: 'Conceição do Araguaia',
      state: 'PA',
      energy_level: 5,
    })

    expect(data?.pets).toEqual([
      expect.objectContaining({
        collar: '4',
        name: 'Felipe',
        energy_level: 5,
        size: 'medium',
        age: 'cub',
        description: 'z.string()',
        independence: 'medium',
        anvironment: 'Lugares fechados',
        org_id: expect.any(String),
      }),
    ])
  })
})
