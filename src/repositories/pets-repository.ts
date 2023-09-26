import { Pet, Prisma } from '@prisma/client'

export interface FindByAttributesProps {
  orgs_ids: string[]
  age?: 'cub' | 'adolescent' | 'elderly'
  energy_level?: number
  size?: 'small' | 'medium' | 'big'
  independence?: 'low' | 'medium' | 'high'
}

type PetWithOutIdAndOrgId = {
  name: string
  energy_level: number
  size: string
  age: string
  description: string
  requirements: string
  independence: string
  environment: string
}

export interface PetsRespository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findByFilter(data: FindByAttributesProps): Promise<Pet[] | null>
  findById(id: string): Promise<Pet | null>
  update(data: PetWithOutIdAndOrgId, id: string): Promise<Pet>
  delete(id: string): Promise<void>
}
