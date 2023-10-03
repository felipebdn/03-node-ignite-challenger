import { prisma } from '@/lib/prisma'
import { ImagesRepository } from '../images-repository'

export class PrismaImagesRepository implements ImagesRepository {
  async findByKey(key: string) {
    const image = await prisma.image.findUnique({
      where: {
        key,
      },
    })
    return image
  }

  async delete(key: string) {
    await prisma.image.delete({
      where: {
        key,
      },
    })
  }

  async create(data: { url: string; pet_id: string; key: string }) {
    const image = await prisma.image.create({
      data,
    })
    return image
  }

  async findManyByPetId(id: string) {
    return await prisma.image.findMany({
      where: {
        pet_id: id,
      },
    })
  }
}
