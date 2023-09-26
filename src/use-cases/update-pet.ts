import { PetsRespository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface UpdatePetRequest {
  data: {
    name: string
    energy_level: number
    size: string
    age: string
    description: string
    requirements: string
    independence: string
    environment: string
  }
  petId: string
}

interface UpdatePetResponse {
  pet: Pet
}

export class UpdatePetUseCase {
  constructor(private petsRespository: PetsRespository) {}

  async execute({ data, petId }: UpdatePetRequest): Promise<UpdatePetResponse> {
    const pet = await this.petsRespository.update(data, petId)

    return { pet }
  }
}
