import { prisma } from '@/lib/prisma'
import { ImagesRepository } from '../images-repository'

export class PrismaImagesRepository implements ImagesRepository {
  async create(url: string[], petId: string) {
    const newDate = url.map((item) => {
      return {
        url: item,
        pet_id: petId,
      }
    })
    await prisma.image.createMany({
      data: newDate,
    })
  }

  async findManyByPetId(id: string) {
    return await prisma.image.findMany({
      where: {
        pet_id: id,
      },
    })
  }
}
