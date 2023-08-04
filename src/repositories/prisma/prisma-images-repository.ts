import { Prisma } from '@prisma/client'
import { ImagesRepository } from '../images-repository'
import { prisma } from '@/lib/prisma'

export class PrismaOrgsRepository implements ImagesRepository {
  async create(data: Prisma.ImageUncheckedCreateInput[]) {
    const images = await prisma.image.createMany({
      data,
    })
    console.log(images)

    return null
  }
}
