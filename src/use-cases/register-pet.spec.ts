import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { PetRegisterUseCase } from './register-pet'
import { PetAlreadyExistsError } from './errors/pet-already-exists-error'

let inMemoryPetsRepository: InMemoryPetsRepository
let sut: PetRegisterUseCase

describe('Pets Register Use Case', () => {
  beforeEach(() => {
    inMemoryPetsRepository = new InMemoryPetsRepository()
    sut = new PetRegisterUseCase(inMemoryPetsRepository)
  })
  it('should be able to register pet', async () => {
    const { pet } = await sut.execute({
      data: {
        collar: '86781211',
        name: 'Felipe',
        energy_level: 5,
        size: 'medium',
        age: 'adolescent',
        description: 'z.string()',
        independence: 'medium',
        anvironment: 'Lugares fechados',
        org_id: 'org_id',
        requirements: 'carinho',
      },
    })

    expect(pet.id).toEqual(expect.any(String))
  })
  it('should be able to register pet with same collar twice', async () => {
    await sut.execute({
      data: {
        collar: '86781211',
        name: 'Felipe',
        energy_level: 5,
        size: 'medium',
        age: 'adolescent',
        description: 'z.string()',
        independence: 'medium',
        anvironment: 'Lugares fechados',
        requirements: 'carinho',
        org_id: 'org_id',
      },
    })

    expect(async () => {
      await sut.execute({
        data: {
          collar: '86781211',
          name: 'Felipe',
          energy_level: 5,
          size: 'medium',
          age: 'adolescent',
          description: 'z.string()',
          independence: 'medium',
          anvironment: 'Lugares fechados',
          requirements: 'carinho',
          org_id: 'org_id',
        },
      })
    }).rejects.toBeInstanceOf(PetAlreadyExistsError)
  })
})
