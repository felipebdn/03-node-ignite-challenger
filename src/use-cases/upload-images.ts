import { ImagesRepository } from '@/repositories/images-repository'
import { PetsRespository } from '@/repositories/pets-repository'
import { Image } from '@prisma/client'
import { PetNotFoundError } from './errors/pet-not-found'
import { OperationNotAuthorizedError } from './errors/operation-not-authorized-error'

interface UploadImagesUseCaseRequest {
  url: string
  pet_id: string
  key: string
  org_id: string
}

interface PetRegisterUseCaseResponse {
  image: Image
}

export class UploadImagesUseCase {
  constructor(
    private imagesRepository: ImagesRepository,
    private petsRepository: PetsRespository,
  ) {}

  async execute({
    pet_id,
    url,
    key,
    org_id,
  }: UploadImagesUseCaseRequest): Promise<PetRegisterUseCaseResponse> {
    const pet = await this.petsRepository.findById(pet_id)

    if (pet?.org_id !== org_id) {
      throw new OperationNotAuthorizedError()
    }

    if (!pet) {
      throw new PetNotFoundError()
    }

    const image = await this.imagesRepository.create({ url, pet_id, key })
    return { image }
  }
}
