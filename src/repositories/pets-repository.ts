import { Pet, Prisma } from '@prisma/client'

export interface PetsRespository {
  create(
    data: Prisma.PetUncheckedCreateInput,
    images: { url: string }[],
  ): Promise<Pet>
  findByCollar(collar: string): Promise<Pet | null>
  findByStateAndCity(state: string, city: string): Promise<Pet[] | null>
}
