import { PetsRespository } from '@/repositories/pets-repository'
import { PetNotFoundError } from './errors/pet-not-found'

export class DeletePetUseCase {
  constructor(private petsRepository: PetsRespository) {}

  async execute(id: string): Promise<void> {
    const findPetById = await this.petsRepository.findById(id)

    if (!findPetById) {
      throw new PetNotFoundError()
    }

    await this.petsRepository.delete(id)
  }
}
