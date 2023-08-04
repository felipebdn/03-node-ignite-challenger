import { Pet } from '@prisma/client'
import { PetsRespository } from '@/repositories/pets-repository'
import { PetAlreadyExistsError } from './errors/pet-already-exists-error'

interface PetRegisterUseCaseRequest {
  collar: string
  name: string
  energy_level: number
  size: number
  age: number
  description: string
  independence: number
  anvironment: number
  org_id: string
  images: string[]
}

interface PetRegisterUseCaseResponse {
  pet: Pet
}

export class PetRegisterUseCase {
  constructor(private petsRepository: PetsRespository) {}

  async execute(
    data: PetRegisterUseCaseRequest,
  ): Promise<PetRegisterUseCaseResponse> {
    const petWithSameCollar = await this.petsRepository.findByCollar(
      data.collar,
    )

    if (petWithSameCollar) {
      throw new PetAlreadyExistsError()
    }

    const pet = await this.petsRepository.create(data)

    return { pet }
  }
}
