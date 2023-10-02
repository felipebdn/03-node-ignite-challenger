import { ImagesRepository } from '@/repositories/images-repository'
import { PetsRespository } from '@/repositories/pets-repository'
import { ImageNotFoundError } from './errors/image-not-found-error'
import { OperationNotAuthorizedError } from './errors/operation-not-authorized-error'

export class DeleteImageUseCase {
  constructor(
    private imagesRepository: ImagesRepository,
    private petsRespository: PetsRespository,
  ) {}

  async execute(key: string, org_id: string): Promise<void> {
    const image = await this.imagesRepository.findByKey(key)

    if (!image) {
      throw new ImageNotFoundError()
    }

    const pet = await this.petsRespository.findById(image.pet_id)

    if (pet && pet.org_id !== org_id) {
      throw new OperationNotAuthorizedError()
    }

    await this.imagesRepository.delete(key)
  }
}
