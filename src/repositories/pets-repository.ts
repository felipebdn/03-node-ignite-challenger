import { Pet, Prisma } from '@prisma/client'

export interface FindByAttributesProps {
  state: string
  city: string
  age?: string
  energy_level?: number
  size?: string
  independence?: string
}

export interface PetsRespository {
  create(
    data: Prisma.PetUncheckedCreateInput,
    images: { url: string }[],
  ): Promise<Pet>
  findByCollar(collar: string): Promise<Pet | null>
  findByStateAndCity(data: FindByAttributesProps): Promise<Pet[] | null>
}
