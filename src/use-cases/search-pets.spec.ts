import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { PetRegisterUseCase } from './register-pet'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { hash } from 'bcryptjs'

let inMemoryOrgsRepository: InMemoryOrgsRepository
let inMemoryPetsRepository: InMemoryPetsRepository
let sut: PetRegisterUseCase

describe('Pets Search Use Case', () => {
  beforeEach(async () => {
    inMemoryOrgsRepository = new InMemoryOrgsRepository()
    inMemoryPetsRepository = new InMemoryPetsRepository()
    sut = new PetRegisterUseCase(inMemoryPetsRepository)

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
    const images = [{ url: 'teste1' }, { url: 'teste2' }]

    await inMemoryPetsRepository.create(
      {
        collar: '1',
        name: 'Felipe',
        energy_level: 5,
        size: 'medium',
        age: 'adolescent',
        description: 'z.string()',
        independence: 'medium',
        anvironment: 'Lugares fechados',
        org_id: 'org-01',
      },
      images,
    )
    await inMemoryPetsRepository.create(
      {
        collar: '2',
        name: 'Felipe',
        energy_level: 5,
        size: 'medium',
        age: 'adolescent',
        description: 'z.string()',
        independence: 'medium',
        anvironment: 'Lugares fechados',
        org_id: 'org-02',
      },
      images,
    )

    expect(pet.id).toEqual(expect.any(String))
  })
})
