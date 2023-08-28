import { Pet, Image, Org } from '@prisma/client'
import { ImagesRepository } from '@/repositories/images-repository'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { PetsRespository } from '@/repositories/pets-repository'

interface GetInfoPetUseCaseResponse {
  pet: Pet
  images: Image[]
  org: Org
}

export class GetInfoPetUseCase {
  constructor(
    private petsRepository: PetsRespository,
    private imagesRepository: ImagesRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute(id: string): Promise<GetInfoPetUseCaseResponse | null> {
    const pet = await this.petsRepository.findById(id)

    if (!pet) {
      return null
    }

    const org = await this.orgsRepository.findById(pet.org_id)

    if (!org) {
      return null
    }

    const images = await this.imagesRepository.findManyByPetId(pet.id)

    return {
      pet,
      images,
      org,
    }
  }
}
