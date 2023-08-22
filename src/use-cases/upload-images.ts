import { ImagesRepository } from '@/repositories/images-repository'

interface UploadImagesUseCaseRequest {
  url: string[]
  petId: string
}

export class UploadImagesUseCase {
  constructor(private imagesRepository: ImagesRepository) {}

  async execute({ petId, url }: UploadImagesUseCaseRequest): Promise<void> {
    await this.imagesRepository.create(url, petId)
  }
}
