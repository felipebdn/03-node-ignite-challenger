import { Org } from '@prisma/client'
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
  images: {
    url: string
  }[]
}

interface OrgRegisterUseCaseResponse {
  org: Org
}

export class OrgRegisterUseCase {
  constructor(private petsRepository: PetsRespository) {}

  async execute(
    data: PetRegisterUseCaseRequest,
  ): Promise<OrgRegisterUseCaseResponse> {
    const orgWithSameCollar = await this.petsRepository.findByCollar(
      data.collar,
    )

    if (orgWithSameCollar) {
      throw new PetAlreadyExistsError()
    }

    const pet = await this.petsRepository.create(
      {
        anvironment: data.anvironment,
        age: data.age,
        collar: data.collar,
        description: data.description,
        energy_level: data.energy_level,
        independence: data.independence,
        name: data.name,
        org_id: data.org_id,
        size: data.size,
      },
      {},
    )
    return { pet }
  }
}
