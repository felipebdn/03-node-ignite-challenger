import { Pet } from '@prisma/client'
import { PetsRespository } from '@/repositories/pets-repository'
import { PetAlreadyExistsError } from './errors/pet-already-exists-error'

interface PetRegisterUseCaseRequest {
  data: {
    collar: string
    name: string
    energy_level: number
    size: 'small' | 'medium' | 'big'
    age: 'cub' | 'adolescent' | 'elderly'
    description: string
    independence: 'low' | 'medium' | 'high'
    anvironment: string
    org_id: string
  }
  requirements: {
    title: string
  }[]
}

interface PetRegisterUseCaseResponse {
  pet: Pet
}

export class PetRegisterUseCase {
  constructor(private petsRepository: PetsRespository) {}

  async execute({
    data,
  }: PetRegisterUseCaseRequest): Promise<PetRegisterUseCaseResponse> {
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
