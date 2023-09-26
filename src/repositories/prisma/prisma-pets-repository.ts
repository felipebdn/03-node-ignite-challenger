import { Prisma } from '@prisma/client'
import { FindByAttributesProps, PetsRespository } from '../pets-repository'
import { prisma } from '@/lib/prisma'
import { DataQueryFilterPets } from '@/lib/data-query-pets'
import { z } from 'zod'

export class PrismaPetsRepository implements PetsRespository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data: {
        age: data.age,
        environment: data.environment,
        description: data.description,
        energy_level: data.energy_level,
        independence: data.independence,
        name: data.name,
        size: data.size,
        org_id: data.org_id,
        requirements: data.requirements,
      },
    })

    return pet
  }

  async findByFilter(data: FindByAttributesProps) {
    const querySchema = z.object({
      orgs_ids: z.string().array(),
      age: z.enum(['cub', 'adolescent', 'elderly']).optional(),
      energy_level: z.coerce.number().min(1).max(5).optional(),
      size: z.enum(['small', 'medium', 'big']).optional(),
      independence: z.enum(['low', 'medium', 'high']).optional(),
    })
    const { query } = DataQueryFilterPets(data)

    const { orgs_ids, ...resto } = querySchema.parse(query)

    const pets = await prisma.pet.findMany({
      where: {
        org_id: {
          in: orgs_ids,
        },
        AND: {
          ...resto,
        },
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
