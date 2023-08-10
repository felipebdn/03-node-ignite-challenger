import { Image } from '@prisma/client'

export interface ImagesRepository {
  create(data: { url: string }[], petId: string): Promise<void>
  findManyByPetId(id: string): Promise<Image[]>
}
