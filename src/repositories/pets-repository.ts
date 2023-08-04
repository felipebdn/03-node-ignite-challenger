import { Image, Pet, Prisma } from '@prisma/client'

export interface PetsRespository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  sendImagesByBookId(
    dataImages: Prisma.ImageUncheckedCreateInput[],
  ): Promise<Image>
  findByCollar(collar: string): Promise<Pet | null>
}
