import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { DeletePetUseCase } from '@/use-cases/delete-pet'

let inMemoryPetsRepository: InMemoryPetsRepository
let sut: DeletePetUseCase

describe('Delete Pet Use Case', () => {
  beforeEach(() => {
    inMemoryPetsRepository = new InMemoryPetsRepository()
    sut = new DeletePetUseCase(inMemoryPetsRepository)
  })
  it('should be able to register pet', async () => {
    const createPet = await inMemoryPetsRepository.create({
      name: 'Felipe',
      energy_level: 5,
      size: 'medium',
      age: 'adolescent',
      description: 'z.string()',
      independence: 'medium',
      environment: 'Lugares fechados',
      org_id: 'org_id',
      requirements: 'carinho',
    })
    await sut.execute(createPet.id)

    const fetchPet = await inMemoryPetsRepository.findById(createPet.id)

    expect(fetchPet).toEqual(null)
  })
})
