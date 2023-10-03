import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { PetRegisterUseCase } from '@/use-cases/register-pet'

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
        name: 'example',
        energy_level: 5,
        size: 'medium',
        age: 'adolescent',
        description: 'example',
        independence: 'medium',
        environment: 'example',
        org_id: 'org_id',
        requirements: 'example',
      },
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
