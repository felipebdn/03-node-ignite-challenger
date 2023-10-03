import { ImagesRepository } from '@/repositories/images-repository'
import { PetsRespository } from '@/repositories/pets-repository'
import { Image } from '@prisma/client'
import { PetNotFoundError } from './errors/pet-not-found'

interface UploadImagesUseCaseRequest {
  url: string
  pet_id: string
  key: string
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
  }: UploadImagesUseCaseRequest): Promise<PetRegisterUseCaseResponse> {
    const pet = await this.petsRepository.findById(pet_id)

    if (!pet) {
      throw new PetNotFoundError()
    }

    const image = await this.imagesRepository.create({ url, pet_id, key })
    return { image }
  }
}
