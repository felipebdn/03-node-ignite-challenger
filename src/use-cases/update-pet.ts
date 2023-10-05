import { PetsRespository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { OperationNotAuthorizedError } from './errors/operation-not-authorized-error'

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
  org_id: string
}

interface UpdatePetResponse {
  pet: Pet
}

export class UpdatePetUseCase {
  constructor(private petsRespository: PetsRespository) {}

  async execute({
    data,
    petId,
    org_id,
  }: UpdatePetRequest): Promise<UpdatePetResponse> {
    const findPet = await this.petsRespository.findById(petId)

    if (org_id !== findPet?.org_id) {
      throw new OperationNotAuthorizedError()
    }
    const pet = await this.petsRespository.update(data, petId)

    return { pet }
  }
}
