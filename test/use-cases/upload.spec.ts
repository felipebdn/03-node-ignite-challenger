import { InMemoryImagesRepository } from '@/repositories/in-memory/in-memory-images-repository'
import { UploadImagesUseCase } from '@/use-cases/upload-images'
import { randomUUID } from 'crypto'
import { beforeEach, describe, expect, it } from 'vitest'

let inMemoryImagesRepository: InMemoryImagesRepository
let sut: UploadImagesUseCase

describe('Upload Image Pet Use Case', () => {
  beforeEach(async () => {
    inMemoryImagesRepository = new InMemoryImagesRepository()
    sut = new UploadImagesUseCase(inMemoryImagesRepository)
  })
  it('should be able to get info of pet', async () => {
    const { image } = await sut.execute({
      petId: 'idpet',
      url: 'imageurl',
      key: randomUUID(),
    })

    expect(image).toEqual(
      expect.objectContaining({
        pet_id: 'idpet',
        url: 'imageurl',
        key: expect.any(String),
        id: expect.any(String),
      }),
    )
  })
})
