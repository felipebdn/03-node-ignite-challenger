import { Image, Prisma } from '@prisma/client'
import { ImagesRepository } from '../images-repository'

export class InMemoryImagesRepository implements ImagesRepository {
  public items: Image[] = []
  async create(data: Prisma.ImageUncheckedCreateInput[]) {
    return null
  }
}
