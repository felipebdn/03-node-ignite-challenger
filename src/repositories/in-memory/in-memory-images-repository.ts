import { Image } from '@prisma/client'
import { ImagesRepository } from '../images-repository'
import { randomUUID } from 'crypto'

export class InMemoryImagesRepository implements ImagesRepository {
  public imagesPet: Image[] = []

  async delete(key: string): Promise<void> {
    this.imagesPet = this.imagesPet.filter((item) => item.url !== key)
  }

  async create(url: string, petId: string, key: string) {
    this.imagesPet.push({
      id: randomUUID(),
      pet_id: petId,
      url,
      key,
    })
  }

  async findManyByPetId(id: string) {
    return this.imagesPet.filter((image) => image.pet_id === id)
  }
}
