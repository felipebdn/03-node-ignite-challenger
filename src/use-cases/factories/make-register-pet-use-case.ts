import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { PetRegisterUseCase } from '../register-pet'
import { PrismaImagesRepository } from '@/repositories/prisma/prisma-images-repository'
import { PrismaRequirementsRepository } from '@/repositories/prisma/prisma-requirements-repository'

export function makePetRegisterUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository()
  const prismaImagesRepository = new PrismaImagesRepository()
  const prismaRequirementsRepository = new PrismaRequirementsRepository()
  const orgRegisterUseCase = new PetRegisterUseCase(
    prismaPetsRepository,
    prismaImagesRepository,
    prismaRequirementsRepository,
  )

  return orgRegisterUseCase
}
