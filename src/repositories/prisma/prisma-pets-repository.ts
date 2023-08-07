import { Prisma } from '@prisma/client'
import { FindByAttributesProps, PetsRespository } from '../pets-repository'
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

  async findByFilter(data: FindByAttributesProps) {
    const query = Object.fromEntries(
      Object.entries(data).filter(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, v]) => v != null && v !== 'city' && v !== 'state',
      ),
    )
    console.log(query)

    const pets = await prisma.pet.findMany({
      where: {
        org: {
          city: {
            contains: data.city,
          },
          state: data.state,
        },
        ...query,
      },
    })

    return pets
  }
}
