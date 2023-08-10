import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { PetRegisterUseCase } from './register-pet'
import { PetAlreadyExistsError } from './errors/pet-already-exists-error'
import { InMemoryImagesRepository } from '@/repositories/in-memory/in-memory-images-repository'
import { InMemoryRequirementsRepository } from '@/repositories/in-memory/in-memory-requirements-repository'

let inMemoryPetsRepository: InMemoryPetsRepository
let inMemoryImagesRepository: InMemoryImagesRepository
let inMemoryRequirementsRepository: InMemoryRequirementsRepository
let sut: PetRegisterUseCase

describe('Pets Register Use Case', () => {
  beforeEach(() => {
    inMemoryPetsRepository = new InMemoryPetsRepository()
    inMemoryImagesRepository = new InMemoryImagesRepository()
    inMemoryRequirementsRepository = new InMemoryRequirementsRepository()
    sut = new PetRegisterUseCase(
      inMemoryPetsRepository,
      inMemoryImagesRepository,
      inMemoryRequirementsRepository,
    )
  })
  it('should be able to register pet', async () => {
    const images = [{ url: 'teste1' }, { url: 'teste2' }]
    const requirements = [{ title: 'wallison queime bastante' }]

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
      },
      requirements,
      images,
    })

    expect(pet.id).toEqual(expect.any(String))
  })
  it('should be able to register pet with same collar twice', async () => {
    const images = [{ url: 'teste1' }, { url: 'teste2' }]
    const requirements = [{ title: 'wallison queime bastante' }]

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
        org_id: 'org_id',
      },
      requirements,
      images,
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
          org_id: 'org_id',
        },
        requirements,
        images,
      })
    }).rejects.toBeInstanceOf(PetAlreadyExistsError)
  })
})
