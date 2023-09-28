import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { UpdatePetUseCase } from '../update-pet'

export function MakeUpdatePetUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository()
  const makeUpdateUseCase = new UpdatePetUseCase(prismaPetsRepository)

  return makeUpdateUseCase
}
