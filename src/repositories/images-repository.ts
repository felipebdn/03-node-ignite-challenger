import { Image } from '@prisma/client'

export interface ImagesRepository {
  create(data: { url: string; pet_id: string; key: string }): Promise<Image>
  findManyByPetId(id: string): Promise<Image[]>
  delete(key: string): Promise<void>
}
