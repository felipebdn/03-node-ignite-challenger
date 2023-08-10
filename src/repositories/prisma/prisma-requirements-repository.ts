import { prisma } from '@/lib/prisma'
import { RequirementRepository } from '../requirements-repository'

export class PrismaRequirementsRepository implements RequirementRepository {
  async create(data: { title: string }[], petId: string) {
    const newData = data.map((item) => {
      return {
        title: item.title,
        pet_id: petId,
      }
    })
    await prisma.requirement.createMany({
      data: newData,
    })
  }

  async findManyByPetId(id: string) {
    return await prisma.requirement.findMany({
      where: {
        pet_id: id,
      },
    })
  }
}
