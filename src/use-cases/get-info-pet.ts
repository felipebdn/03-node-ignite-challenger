import { PetsRespository } from '@/repositories/pets-repository'
import { Image, Pet } from '@prisma/client'

interface GetInfoPetUseCaseResponse {
  pet: Pet
  images: Image[]
}
export class GetInfoPetUseCase {
  constructor(private petsRepository: PetsRespository) {}
  async execute(id: string): Promise<GetInfoPetUseCaseResponse | null> {
    const data = await this.petsRepository.findById(id)

    if (!data) {
      return null
    }

    return data
  }
}
