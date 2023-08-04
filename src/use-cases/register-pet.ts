import { Pet } from '@prisma/client'
import { PetsRespository } from '@/repositories/pets-repository'
import { PetAlreadyExistsError } from './errors/pet-already-exists-error'

interface PetRegisterUseCaseRequest {
  dataPet: {
    collar: string
    name: string
    energy_level: number
    size: number
    age: number
    description: string
    independence: number
    anvironment: number
    org_id: string
  }
  images: {
    url: string
  }[]
}

interface PetRegisterUseCaseResponse {
  pet: Pet
}

export class PetRegisterUseCase {
  constructor(private petsRepository: PetsRespository) {}

  async execute({
    dataPet,
    images,
  }: PetRegisterUseCaseRequest): Promise<PetRegisterUseCaseResponse> {
    const orgWithSameCollar = await this.petsRepository.findByCollar(
      dataPet.collar,
    )

    if (orgWithSameCollar) {
      throw new PetAlreadyExistsError()
    }

    const pet = await this.petsRepository.create({
      anvironment: dataPet.anvironment,
      age: dataPet.age,
      collar: dataPet.collar,
      description: dataPet.description,
      energy_level: dataPet.energy_level,
      independence: dataPet.independence,
      name: dataPet.name,
      org_id: dataPet.org_id,
      size: dataPet.size,
    })

    const sendImages = images.map((image) => {
      return {
        url: image.url,
        pet_id: pet.id,
      }
    })

    await this.petsRepository.sendImagesByBookId(sendImages)

    return { pet }
  }
}
