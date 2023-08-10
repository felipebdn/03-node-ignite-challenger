import { ImagesRepository } from '@/repositories/images-repository'
import { PetsRespository } from '@/repositories/pets-repository'
import { RequirementRepository } from '@/repositories/requirements-repository'
import { Pet, Requirement, Image } from '@prisma/client'

interface GetInfoPetUseCaseResponse {
  pet: Pet
  images: Image[]
  requirements: Requirement[]
}

export class GetInfoPetUseCase {
  constructor(
    private petsRepository: PetsRespository,
    private imagesRepository: ImagesRepository,
    private requirementRepository: RequirementRepository,
  ) {}

  async execute(id: string): Promise<GetInfoPetUseCaseResponse | null> {
    const pet = await this.petsRepository.findById(id)

    if (!pet) {
      return null
    }

    const images = await this.imagesRepository.findManyByPetId(pet.id)
    const requirements = await this.requirementRepository.findManyByPetId(
      pet.id,
    )

    return {
      pet,
      images,
      requirements,
    }
  }
}
