import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { UpdatePetUseCase } from '@/use-cases/update-pet'

let inMemoryPetsRepository: InMemoryPetsRepository
let sut: UpdatePetUseCase

describe('Update Pet Use Case', () => {
  beforeEach(() => {
    inMemoryPetsRepository = new InMemoryPetsRepository()
    sut = new UpdatePetUseCase(inMemoryPetsRepository)
  })
  it('should be able to register pet', async () => {
    const createPet = await inMemoryPetsRepository.create({
      name: 'example',
      energy_level: 5,
      size: 'medium',
      age: 'adolescent',
      description: 'empty',
      independence: 'medium',
      environment: 'example',
      org_id: 'org_id',
      requirements: 'example',
    })
    const { pet } = await sut.execute({
      data: {
        name: 'example',
        energy_level: 3,
        size: 'big',
        age: 'cub',
        description: 'empty',
        independence: 'low',
        environment: 'example',
        requirements: 'example',
      },
      petId: createPet.id,
    })

    expect(pet).toEqual(
      expect.objectContaining({
        name: 'example',
        energy_level: 3,
        size: 'big',
        age: 'cub',
        description: 'empty',
        independence: 'low',
        environment: 'example',
        requirements: 'example',
      }),
    )
  })
})
