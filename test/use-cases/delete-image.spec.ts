import { InMemoryImagesRepository } from '@/repositories/in-memory/in-memory-images-repository'
import { DeleteImageUseCase } from '@/use-cases/delete-image'
import { randomUUID } from 'crypto'
import { beforeEach, describe, expect, it } from 'vitest'

let inMemoryImagesRepository: InMemoryImagesRepository
let sut: DeleteImageUseCase

describe('Upload Image Pet Use Case', () => {
  beforeEach(async () => {
    inMemoryImagesRepository = new InMemoryImagesRepository()
    sut = new DeleteImageUseCase(inMemoryImagesRepository)
  })
  it('should be able to get info of pet', async () => {
    const createImage = await inMemoryImagesRepository.create({
      pet_id: 'idpet',
      url: 'imageurl',
      key: randomUUID(),
    })

    await sut.execute(createImage.key)

    const image = await inMemoryImagesRepository.findManyByPetId(createImage.id)

    expect(image.length).toEqual(0)
  })
})
