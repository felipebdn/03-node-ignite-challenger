import { Image, Pet, Prisma } from '@prisma/client'
import { PetsRespository } from '../pets-repository'
import { randomUUID } from 'node:crypto'

export class PrismaPetsRepository implements PetsRespository {
  public items: Pet[] = []
  public images: Image[] = []

  async findByCollar(collar: string) {
    const pet = this.items.find((item) => item.collar === collar)

    if (!pet) {
      return null
    }

    return pet
  }

  async create(
    data: Prisma.PetUncheckedCreateInput,
    dataImages: Prisma.ImageUncheckedCreateInput[],
  ) {
    const pet: Pet = {
      id: randomUUID(),
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
    dataImages.map((image) => {
      this.images.push({
        id: randomUUID(),
        pet_id: image.pet_id,
        url: image.url,
      })
      return null
    })
    this.items.push(pet)

    return pet
  }
}
