import { Image, Prisma } from '@prisma/client'

export interface ImagesRepository {
  create(data: Prisma.ImageUncheckedCreateInput[]): Promise<Image[] | null>
}
