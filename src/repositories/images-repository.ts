import { Image } from '@prisma/client'

export interface ImagesRepository {
  create(url: string[], petId: string): Promise<void>
  findManyByPetId(id: string): Promise<Image[]>
}
