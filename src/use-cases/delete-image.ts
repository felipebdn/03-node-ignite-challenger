import { ImagesRepository } from '@/repositories/images-repository'

export class DeleteImageUseCase {
  constructor(private imagesRepository: ImagesRepository) {}

  async execute(key: string): Promise<void> {
    await this.imagesRepository.delete(key)
  }
}
