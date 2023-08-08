import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { GetInfoPetUseCase } from './get-info-pet'

let inMemoryPetsRepository: InMemoryPetsRepository
let sut: GetInfoPetUseCase

describe('Pets Search Use Case', () => {
  beforeEach(async () => {
    inMemoryPetsRepository = new InMemoryPetsRepository()
    sut = new GetInfoPetUseCase(inMemoryPetsRepository)
  })
  it('should be able to search pets', async () => {
    const images = [{ url: 'teste1' }, { url: 'teste2' }]
    const requirements = [{ title: 'wallison queime bastante' }]

    await inMemoryPetsRepository.create(
      {
        collar: '2',
        name: 'Felipe',
        energy_level: 4,
        size: 'small',
        age: 'adolescent',
        description: 'z.string()',
        independence: 'medium',
        anvironment: 'Lugares fechados',
        org_id: 'org-01',
      },
      requirements,
      images,
    )
    const { id } = await inMemoryPetsRepository.create(
      {
        collar: '1',
        name: 'Felipe',
        energy_level: 4,
        size: 'small',
        age: 'adolescent',
        description: 'z.string()',
        independence: 'medium',
        anvironment: 'Lugares fechados',
        org_id: 'org-01',
      },
      requirements,
      images,
    )

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
    expect(data?.images).toEqual([
      { pet_id: expect.any(String), url: 'teste1', id: expect.any(String) },
      { pet_id: expect.any(String), url: 'teste2', id: expect.any(String) },
    ])
  })
})
