import { PetsRespository } from '@/repositories/pets-repository'
import { PetNotFoundError } from './errors/pet-not-found'
import { OperationNotAuthorizedError } from './errors/operation-not-authorized-error'

export class DeletePetUseCase {
  constructor(private petsRepository: PetsRespository) {}

  async execute(id: string, org_id: string): Promise<void> {
    const findPetById = await this.petsRepository.findById(id)

    if (!findPetById) {
      throw new PetNotFoundError()
    }

    if (findPetById.org_id !== org_id) {
      throw new OperationNotAuthorizedError()
    }

    await this.petsRepository.delete(id)
  }
}
