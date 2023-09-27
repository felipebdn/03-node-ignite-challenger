import { ImagesRepository } from '@/repositories/images-repository'
import { Image } from '@prisma/client'

interface UploadImagesUseCaseRequest {
  url: string
  pet_id: string
  key: string
}

interface PetRegisterUseCaseResponse {
  image: Image
}

export class UploadImagesUseCase {
  constructor(private imagesRepository: ImagesRepository) {}

  async execute({
    pet_id,
    url,
    key,
  }: UploadImagesUseCaseRequest): Promise<PetRegisterUseCaseResponse> {
    const image = await this.imagesRepository.create({ url, pet_id, key })
    return { image }
  }
}
