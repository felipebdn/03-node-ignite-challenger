import { Image, Pet, Prisma } from '@prisma/client'
import { FindByAttributesProps, PetsRespository } from '../pets-repository'
import { randomUUID } from 'node:crypto'
import { DataQueryFilterPets } from '@/lib/data-query-pets'
import console from 'node:console'

export class InMemoryPetsRepository implements PetsRespository {
  public items: Pet[] = []
  public imagesPet: Image[] = []

  async findByCollar(collar: string) {
    const pet = this.items.find((item) => item.collar === collar)

    if (!pet) {
      return null
    }

    return pet
  }

  async create(
    data: Prisma.PetUncheckedCreateInput,
    images: { url: string }[],
  ) {
    const pet: Pet = {
      id: data.id ?? randomUUID(),
      age: data.age,
      collar: data.collar,
      anvironment: data.anvironment,
      description: data.description,
      energy_level: data.energy_level,
      independence: data.independence,
      name: data.name,
      org_id: data.org_id,
      size: data.size,
    }
    images.map((image) => {
      return this.imagesPet.push({
        id: randomUUID(),
        pet_id: pet.id,
        url: image.url,
      })
    })

    this.items.push(pet)

    return pet
  }

  async findByFilter(data: FindByAttributesProps) {
    const { query } = DataQueryFilterPets(data)
    console.log(query)

    const pets = this.items.filter((pet) => {
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
          return pet.age === value
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
}
