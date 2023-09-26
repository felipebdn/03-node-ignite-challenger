import { InMemoryImagesRepository } from '@/repositories/in-memory/in-memory-images-repository'
import { DeleteImageUseCase } from '@/use-cases/delete-image'
import { beforeEach, describe, expect, it } from 'vitest'

let inMemoryImagesRepository: InMemoryImagesRepository
let sut: DeleteImageUseCase

describe('Delete Image Pet Use Case', () => {
  beforeEach(async () => {
    inMemoryImagesRepository = new InMemoryImagesRepository()
    sut = new DeleteImageUseCase(inMemoryImagesRepository)
  })
  it('should be able to delete image of pet', async () => {
    const image = await inMemoryImagesRepository.create(
      'imageurl',
      'idpet',
      'imagekey',
    )
    await sut.execute(image.key)

    const findImage = await inMemoryImagesRepository.findManyByPetId(
      image.pet_id,
    )
    console.log(findImage)

    expect(findImage.length).toEqual(0)
  })
})
