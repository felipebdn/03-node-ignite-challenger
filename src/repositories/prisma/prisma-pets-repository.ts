import { Prisma } from '@prisma/client'
import { FindByAttributesProps, PetsRespository } from '../pets-repository'
import { prisma } from '@/lib/prisma'
import { DataQueryFilterPets } from '@/lib/data-query-pets'

export class PrismaPetsRepository implements PetsRespository {
  async findByCollar(collar: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        collar,
      },
    })
    return pet
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data: {
        age: data.age,
        anvironment: data.anvironment,
        collar: data.collar,
        description: data.description,
        energy_level: data.energy_level,
        independence: data.independence,
        name: data.name,
        size: data.size,
        org_id: data.org_id,
      },
    })
    return pet
  }

  async findByFilter(data: FindByAttributesProps) {
    const { query } = DataQueryFilterPets(data)

    const pets = await prisma.pet.findMany({
      where: {
        ...query,
      },
    })

    return pets
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })
    return pet
  }
}
