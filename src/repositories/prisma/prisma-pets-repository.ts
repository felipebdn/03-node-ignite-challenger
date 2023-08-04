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

  async create({ Images, ...data }: Prisma.PetUncheckedCreateInput) {
    console.log(Images)

    const pet = await prisma.pet.create({
      data: {
        ...data,
        Images: {
          createMany: {
            data: [
              {
                url: 'teste',
              },
              {
                url: 'teste2',
              },
            ],
          },
        },
      },
    })
    return pet
  }
}
