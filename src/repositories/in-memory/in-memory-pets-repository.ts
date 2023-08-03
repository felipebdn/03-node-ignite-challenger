import { Prisma } from '@prisma/client'
import { PetsRespository } from '../pets-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetsRespository {
  async create(
    data: Prisma.PetUncheckedCreateInput,
    dataImages: Prisma.ImageUncheckedCreateInput,
  ) {
    const pet = await prisma.pet.create({
      data,
    })
    await prisma.image.create({
      data: {
        url: dataImages.url,
        pet_id: dataImages.pet_id,
      },
    })
    return pet
  }
}
