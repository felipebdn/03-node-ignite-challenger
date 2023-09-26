import { prisma } from '@/lib/prisma'
import { ImagesRepository } from '../images-repository'

export class PrismaImagesRepository implements ImagesRepository {
  async delete(key: string): Promise<void> {
    await prisma.image.delete({
      where: {
        key,
      },
    })
  }

  async create(url: string, petId: string, key: string) {
    const image = await prisma.image.create({
      data: {
        key,
        url,
        pet_id: petId,
      },
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
