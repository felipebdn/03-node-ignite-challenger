import { ImagesRepository } from '@/repositories/images-repository'
import { Image } from '@prisma/client'

interface UploadImagesUseCaseRequest {
  url: string
  petId: string
  key: string
}

interface PetRegisterUseCaseResponse {
  image: Image
}

export class UploadImagesUseCase {
  constructor(private imagesRepository: ImagesRepository) {}

  async execute({
    petId,
    url,
    key,
  }: UploadImagesUseCaseRequest): Promise<PetRegisterUseCaseResponse> {
    const image = await this.imagesRepository.create(url, petId, key)
    return { image }
  }
}
