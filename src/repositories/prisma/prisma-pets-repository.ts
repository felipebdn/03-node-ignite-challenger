import { Prisma } from '@prisma/client'
import { PetsRespository } from '../pets-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetsRespository {
  async findByCollar(collar: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        collar,
      },
    })
    return pet
  }

  async create(
    data: Prisma.PetUncheckedCreateInput,
    images: { url: string }[],
  ) {
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
        Images: {
          createMany: {
            data: images,
          },
        },
      },
      include: {
        Images: true,
      },
    })
    return pet
  }

  async findByStateAndCity(state: string, city: string) {
    const orgsWithStateAndCity = await prisma.org.findMany({
      where: {
        state,
        city: {
          contains: city,
        },
      },
    })
    const pets = await prisma.pet.findMany({
      where: {
        org_id: {
          in: orgsWithStateAndCity.map((org) => org.id),
        },
      },
      include: {
        Images: true,
      },
    })
    return pets
  }
}
