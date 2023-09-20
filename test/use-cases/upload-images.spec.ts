import { beforeEach, describe, it } from 'vitest'
import { InMemoryImagesRepository } from '@/repositories/in-memory/in-memory-images-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { UploadImagesUseCase } from '@/use-cases/upload-images'

let inMemoryImagesRepository: InMemoryImagesRepository
let sut: UploadImagesUseCase

describe('Upload Images Use Case', () => {
  beforeEach(async () => {
    inMemoryImagesRepository = new InMemoryImagesRepository()
    sut = new UploadImagesUseCase(inMemoryImagesRepository)
  })
  it('should be able uplaod images', async () => {
    const imagesData = ['teste.png', 'teste1.png']

    const inMemoryPetsRepository = new InMemoryPetsRepository()

    const pet = await inMemoryPetsRepository.create({
      name: 'Felipe',
      energy_level: 5,
      size: 'medium',
      age: 'adolescent',
      description: 'z.string()',
      independence: 'medium',
      anvironment: 'Lugares fechados',
      org_id: 'org_id',
      requirements: 'carinho',
    })

    await sut.execute({ url: imagesData, petId: pet.id })
  })
})
