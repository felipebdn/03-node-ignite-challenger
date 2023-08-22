import { ImagesRepository } from '@/repositories/images-repository'
import { PetsRespository } from '@/repositories/pets-repository'
import { Pet, Image } from '@prisma/client'

interface GetInfoPetUseCaseResponse {
  pet: Pet
  images: Image[]
}

export class GetInfoPetUseCase {
  constructor(
    private petsRepository: PetsRespository,
    private imagesRepository: ImagesRepository,
  ) {}

  async execute(id: string): Promise<GetInfoPetUseCaseResponse | null> {
    const pet = await this.petsRepository.findById(id)

    if (!pet) {
      return null
    }

    const images = await this.imagesRepository.findManyByPetId(pet.id)

    return {
      pet,
      images,
    }
  }
}
