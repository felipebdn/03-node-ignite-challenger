import { Image } from '@prisma/client'
import { ImagesRepository } from '../images-repository'
import { randomUUID } from 'crypto'

export class InMemoryImagesRepository implements ImagesRepository {
  public imagesPet: Image[] = []
  async create(data: { url: string }[], petId: string) {
    data.map((image) => {
      return this.imagesPet.push({
        id: randomUUID(),
        pet_id: petId,
        url: image.url,
      })
    })
  }

  async findManyByPetId(id: string) {
    return this.imagesPet.filter((image) => image.pet_id === id)
  }
}
