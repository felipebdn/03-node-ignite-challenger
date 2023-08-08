import { Pet, Prisma } from '@prisma/client'

export interface FindByAttributesProps {
  state: string
  city: string
  age?: 'cub' | 'adolescent' | 'elderly'
  energy_level?: number
  size?: 'small' | 'medium' | 'big'
  independence?: 'low' | 'medium' | 'high'
}

export interface PetsRespository {
  create(
    data: Prisma.PetUncheckedCreateInput,
    images: { url: string }[],
  ): Promise<Pet>
  findByCollar(collar: string): Promise<Pet | null>
  findByFilter(data: FindByAttributesProps): Promise<Pet[] | null>
}
