import { Pet, Prisma } from '@prisma/client'

export interface PetsRespository {
  create(
    data: Prisma.PetUncheckedCreateInput,
    dataImages: Prisma.ImageUncheckedCreateInput,
  ): Promise<Pet>
}
