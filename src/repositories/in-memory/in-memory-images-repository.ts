import { Image } from '@prisma/client'
import { ImagesRepository } from '../images-repository'
import { randomUUID } from 'crypto'

export class InMemoryImagesRepository implements ImagesRepository {
  public imagesPet: Image[] = []
  async create(url: string[], petId: string) {
    url.map((image) => {
      return this.imagesPet.push({
        id: randomUUID(),
        pet_id: petId,
        url: image,
      })
    })
  }

  async findManyByPetId(id: string) {
    return this.imagesPet.filter((image) => image.pet_id === id)
  }
}
