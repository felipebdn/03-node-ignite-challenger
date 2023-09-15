import { Pet, Prisma } from '@prisma/client'

export interface FindByAttributesProps {
  orgs_ids: string[]
  age?: 'cub' | 'adolescent' | 'elderly'
  energy_level?: number
  size?: 'small' | 'medium' | 'big'
  independence?: 'low' | 'medium' | 'high'
}

export interface PetsRespository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findByFilter(data: FindByAttributesProps): Promise<Pet[] | null>
  findById(id: string): Promise<Pet | null>
}
