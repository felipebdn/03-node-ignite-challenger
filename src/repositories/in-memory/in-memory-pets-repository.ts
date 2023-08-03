import { Image, Pet, Prisma } from '@prisma/client'
import { PetsRespository } from '../pets-repository'
import { randomUUID } from 'node:crypto'

export class PrismaPetsRepository implements PetsRespository {
  public items: Pet[] = []
  public images: Image[] = []

  async create(
    data: Prisma.PetUncheckedCreateInput,
    dataImages: Prisma.ImageUncheckedCreateInput,
  ) {
    const pet: Pet = {
      id: randomUUID(),
      age: BigInt(data.age),
      anvironment: BigInt(data.anvironment),
      description: data.description,
      energy_level: BigInt(data.energy_level),
      independence: BigInt(data.independence),
      name: data.name,
      org_id: data.org_id,
      size: BigInt(data.size),
    }
    const images
    this.items.push(pet)

    return pet
  }
}
