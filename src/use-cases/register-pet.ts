import { Pet } from '@prisma/client'
import { PetsRespository } from '@/repositories/pets-repository'

interface PetRegisterUseCaseRequest {
  data: {
    name: string
    energy_level: number
    size: 'small' | 'medium' | 'big'
    age: 'cub' | 'adolescent' | 'elderly'
    description: string
    independence: 'low' | 'medium' | 'high'
    environment: string
    requirements: string
    org_id: string
  }
}

interface PetRegisterUseCaseResponse {
  pet: Pet
}

export class PetRegisterUseCase {
  constructor(private petsRepository: PetsRespository) {}

  async execute(
    valueData: PetRegisterUseCaseRequest,
  ): Promise<PetRegisterUseCaseResponse> {
    const data = valueData.data

    const pet = await this.petsRepository.create(data)

    return { pet }
  }
}
