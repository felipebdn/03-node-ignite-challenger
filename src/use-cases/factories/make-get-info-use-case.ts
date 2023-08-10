import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { GetInfoPetUseCase } from '../get-info-pet'
import { PrismaImagesRepository } from '@/repositories/prisma/prisma-images-repository'
import { PrismaRequirementsRepository } from '@/repositories/prisma/prisma-requirements-repository'

export function MakeGetInfoPetUseCase() {
  const prismaPetsRespository = new PrismaPetsRepository()
  const prismaImagesRepository = new PrismaImagesRepository()
  const prismaRequirementsRepository = new PrismaRequirementsRepository()
  const getInfoPetUseCase = new GetInfoPetUseCase(
    prismaPetsRespository,
    prismaImagesRepository,
    prismaRequirementsRepository,
  )

  return getInfoPetUseCase
}
