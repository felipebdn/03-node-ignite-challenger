import { Image } from '@prisma/client'

export interface ImagesRepository {
  create(url: string, petId: string, key: string): Promise<Image>
  findManyByPetId(id: string): Promise<Image[]>
  delete(key: string): Promise<void>
}
