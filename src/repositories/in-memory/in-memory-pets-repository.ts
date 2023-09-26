import { Pet, Prisma } from '@prisma/client'
import { FindByAttributesProps, PetsRespository } from '../pets-repository'
import { randomUUID } from 'node:crypto'
import { DataQueryFilterPets } from '@/lib/data-query-pets'

export class InMemoryPetsRepository implements PetsRespository {
  public items: Pet[] = []

  async delete(id: string) {
    const filterWithOutPetFromId = this.items.filter((item) => item.id !== id)

    this.items = filterWithOutPetFromId
  }

  async update(
    data: {
      name: string
      energy_level: number
      size: string
      age: string
      description: string
      requirements: string
      independence: string
      environment: string
    },
    id: string,
  ) {
    const findIndexPetById = this.items.findIndex((item) => item.id === id)

    this.items[findIndexPetById] = {
      age: data.age,
      environment: data.environment,
      description: data.description,
      energy_level: data.energy_level,
      id: this.items[findIndexPetById].id,
      independence: data.independence,
      name: data.name,
      org_id: this.items[findIndexPetById].org_id,
      requirements: data.requirements,
      size: data.size,
    }

    return this.items[findIndexPetById]
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet: Pet = {
      id: data.id ?? randomUUID(),
      age: data.age,
      environment: data.environment,
      description: data.description,
      energy_level: data.energy_level,
      independence: data.independence,
      name: data.name,
      org_id: data.org_id,
      size: data.size,
      requirements: data.requirements,
    }

    this.items.push(pet)
    return pet
  }

  async findByFilter(data: FindByAttributesProps) {
    const { query } = DataQueryFilterPets(data)

    const pets = this.items.filter((pet) => {
      const petExistsInOrg = data.orgs_ids.find((org) => org === pet.org_id)

      if (!petExistsInOrg) {
        return false
      }
      for (const [key, value] of Object.entries(query)) {
        if (key === 'age') {
          if (value === 'cub') {
            return pet.age === 'cub'
          } else if (value === 'adolescent') {
            return pet.age === 'adolescent'
          } else if (value === 'elderly') {
            return pet.age === 'elderly'
          }
        } else if (key === 'energy_level') {
          return pet.energy_level === value
        } else if (key === 'size') {
          if (value === 'small') {
            return pet.size === 'small'
          } else if (value === 'medium') {
            return pet.size === 'medium'
          } else if (value === 'big') {
            return pet.size === 'big'
          }
        } else if (key === 'independence') {
          if (value === 'low') {
            return pet.independence === 'low'
          } else if (value === 'medium') {
            return pet.independence === 'medium'
          } else if (value === 'high') {
            return pet.independence === 'high'
          }
        }
      }
      return false
    })
    return pets
  }

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
  }
}
