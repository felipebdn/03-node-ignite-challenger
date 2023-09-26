import { PetsRespository } from '@/repositories/pets-repository'

export class DeletePetUseCase {
  constructor(private petsRepository: PetsRespository) {}

  async execute(id: string): Promise<void> {
    await this.petsRepository.delete(id)
  }
}
