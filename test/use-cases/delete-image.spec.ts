import { InMemoryImagesRepository } from '@/repositories/in-memory/in-memory-images-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { DeleteImageUseCase } from '@/use-cases/delete-image'
import { ImageNotFoundError } from '@/use-cases/errors/image-not-found-error'
import { OperationNotAuthorizedError } from '@/use-cases/errors/operation-not-authorized-error'
import { randomUUID } from 'crypto'
import { beforeEach, describe, expect, expect, it } from 'vitest'

let inMemoryImagesRepository: InMemoryImagesRepository
let inMemoryPetsRepository: InMemoryPetsRepository
let sut: DeleteImageUseCase

describe('Delete Image Pet Use Case', () => {
  beforeEach(async () => {
    inMemoryImagesRepository = new InMemoryImagesRepository()
    inMemoryPetsRepository = new InMemoryPetsRepository()
    sut = new DeleteImageUseCase(
      inMemoryImagesRepository,
      inMemoryPetsRepository,
    )
  })

  it('should be able to delete image of Pet', async () => {
    const createPet = await inMemoryPetsRepository.create({
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

    const createImage = await inMemoryImagesRepository.create({
      pet_id: createPet.id,
      url: 'imageurl',
      key: randomUUID(),
    })

    await sut.execute(createImage.key, 'org_id')

    const image = await inMemoryImagesRepository.findManyByPetId(createImage.id)

    expect(image.length).toEqual(0)
  })

  it('should not be able to delete the Pet image because it does not exist', async () => {
    expect(async () => {
      await sut.execute('imagekey', 'org_id')
    }).rejects.toBeInstanceOf(ImageNotFoundError)
  })

  it('should not be able to delete the Pet image because the Org is not authorized', async () => {
    const createPet = await inMemoryPetsRepository.create({
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

    const createImage = await inMemoryImagesRepository.create({
      pet_id: createPet.id,
      url: 'imageurl',
      key: randomUUID(),
    })

    expect(async () => {
      await sut.execute(createImage.key, 'org_id1')
    }).rejects.toBeInstanceOf(OperationNotAuthorizedError)
  })
})
