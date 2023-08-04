import { Pet, Prisma } from '@prisma/client'

export interface PetsRespository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findByCollar(collar: string): Promise<Pet | null>
}
