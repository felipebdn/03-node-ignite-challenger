import { Image, Pet, Prisma } from '@prisma/client'

export interface FindByAttributesProps {
  orgs_ids: string[]
  age?: 'cub' | 'adolescent' | 'elderly'
  energy_level?: number
  size?: 'small' | 'medium' | 'big'
  independence?: 'low' | 'medium' | 'high'
}

type ResponseFindById = {
  pet: Pet
  images: Image[]
}

export interface PetsRespository {
  create(
    data: Prisma.PetUncheckedCreateInput,
    requirements: { title: string }[],
    images: { url: string }[],
  ): Promise<Pet>
  findByCollar(collar: string): Promise<Pet | null>
  findByFilter(data: FindByAttributesProps): Promise<Pet[] | null>
  findById(id: string): Promise<ResponseFindById | null>
}
