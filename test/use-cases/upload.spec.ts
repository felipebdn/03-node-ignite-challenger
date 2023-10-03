import { InMemoryImagesRepository } from '@/repositories/in-memory/in-memory-images-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { UploadImagesUseCase } from '@/use-cases/upload-images'
import { randomUUID } from 'crypto'
import { beforeEach, describe, expect, it } from 'vitest'

let inMemoryImagesRepository: InMemoryImagesRepository
let inMemoryPetsRepository: InMemoryPetsRepository
let sut: UploadImagesUseCase

describe('Upload Image Pet Use Case', () => {
  beforeEach(async () => {
    inMemoryImagesRepository = new InMemoryImagesRepository()
    inMemoryPetsRepository = new InMemoryPetsRepository()
    sut = new UploadImagesUseCase(
      inMemoryImagesRepository,
      inMemoryPetsRepository,
    )
  })
  it('should be able to get info of pet', async () => {
    const pet = await inMemoryPetsRepository.create({
      name: 'example',
      energy_level: 5,
      size: 'medium',
      age: 'adolescent',
      description: 'example',
      independence: 'medium',
      environment: 'example',
      org_id: 'org_id',
      requirements: 'example',
    })

    const { image } = await sut.execute({
      pet_id: pet.id,
      url: 'imageurl',
      key: randomUUID(),
    })

    expect(image).toEqual(
      expect.objectContaining({
        pet_id: expect.any(String),
        url: 'imageurl',
        key: expect.any(String),
        id: expect.any(String),
      }),
    )
  })
})
