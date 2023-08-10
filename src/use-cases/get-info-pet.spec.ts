import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { GetInfoPetUseCase } from './get-info-pet'
import { InMemoryImagesRepository } from '@/repositories/in-memory/in-memory-images-repository'
import { InMemoryRequirementsRepository } from '@/repositories/in-memory/in-memory-requirements-repository'

let inMemoryPetsRepository: InMemoryPetsRepository
let inMemoryImagesRepository: InMemoryImagesRepository
let inMemoryRequirementsRepository: InMemoryRequirementsRepository
let sut: GetInfoPetUseCase

describe('Pets Get Info Pet Use Case', () => {
  beforeEach(async () => {
    inMemoryPetsRepository = new InMemoryPetsRepository()
    inMemoryImagesRepository = new InMemoryImagesRepository()
    inMemoryRequirementsRepository = new InMemoryRequirementsRepository()
    sut = new GetInfoPetUseCase(
      inMemoryPetsRepository,
      inMemoryImagesRepository,
      inMemoryRequirementsRepository,
    )
  })
  it('should be able to get info of pet', async () => {
    await inMemoryPetsRepository.create({
      collar: '2',
      name: 'Felipe',
      energy_level: 4,
      size: 'small',
      age: 'adolescent',
      description: 'z.string()',
      independence: 'medium',
      anvironment: 'Lugares fechados',
      org_id: 'org-01',
    })
    const { id } = await inMemoryPetsRepository.create({
      collar: '1',
      name: 'Felipe',
      energy_level: 4,
      size: 'small',
      age: 'adolescent',
      description: 'z.string()',
      independence: 'medium',
      anvironment: 'Lugares fechados',
      org_id: 'org-01',
    })

    const data = await sut.execute(id)

    expect(data?.pet).toEqual({
      collar: '1',
      name: 'Felipe',
      energy_level: 4,
      size: 'small',
      age: 'adolescent',
      description: 'z.string()',
      independence: 'medium',
      anvironment: 'Lugares fechados',
      org_id: 'org-01',
      id: expect.any(String),
    })
  })
})
