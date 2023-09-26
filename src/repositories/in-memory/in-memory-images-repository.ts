import { Image } from '@prisma/client'
import { ImagesRepository } from '../images-repository'
import { randomUUID } from 'crypto'

export class InMemoryImagesRepository implements ImagesRepository {
  public imagesPet: Image[] = []

  async delete(key: string): Promise<void> {
    this.imagesPet = this.imagesPet.filter((item) => item.url !== key)
  }

  async create(url: string, petId: string, key: string) {
    const image = {
      id: randomUUID(),
      pet_id: petId,
      url,
      key,
    }
    this.imagesPet.push(image)
    return image
  }

  async findManyByPetId(id: string) {
    return this.imagesPet.filter((image) => image.pet_id === id)
  }
}
