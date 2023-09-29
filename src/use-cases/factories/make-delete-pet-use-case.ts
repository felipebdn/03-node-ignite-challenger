import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { DeletePetUseCase } from '../delete-pet'

export function MakeDeletePetUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository()
  const deletePetUseCase = new DeletePetUseCase(prismaPetsRepository)
  return deletePetUseCase
}
