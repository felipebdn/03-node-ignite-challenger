import { Image } from '@prisma/client'
import { ImagesRepository } from '../images-repository'
import { randomUUID } from 'crypto'

export class InMemoryImagesRepository implements ImagesRepository {
  public imagesPet: Image[] = []

  async delete(key: string): Promise<void> {
    this.imagesPet = this.imagesPet.filter((item) => item.url !== key)
  }

  async create(data: { url: string; pet_id: string; key: string }) {
    const image = {
      id: randomUUID(),
      pet_id: data.pet_id,
      url: data.url,
      key: data.key,
    }
    this.imagesPet.push(image)
    return image
  }

  async findManyByPetId(id: string) {
    return this.imagesPet.filter((image) => image.pet_id === id)
  }
}
