import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { PetRegisterUseCase } from '../register-pet'

export function makePetRegisterUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository()
  const orgRegisterUseCase = new PetRegisterUseCase(prismaPetsRepository)

  return orgRegisterUseCase
}
