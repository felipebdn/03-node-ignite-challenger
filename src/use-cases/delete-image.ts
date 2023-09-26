import { ImagesRepository } from '@/repositories/images-repository'

interface DeleteImageUseCaseRequest {
  key: string
}

export class DeleteImageUseCase {
  constructor(private imagesRepository: ImagesRepository) {}

  async execute({ key }: DeleteImageUseCaseRequest): Promise<void> {
    await this.imagesRepository.delete(key)
  }
}
