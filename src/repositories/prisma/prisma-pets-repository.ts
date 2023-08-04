import { Prisma } from '@prisma/client'
import { PetsRespository } from '../pets-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetsRespository {
  async findByCollar(collar: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        collar,
      },
    })
    if (!pet) {
      return null
    }
    return pet
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })
    return pet
  }
}
