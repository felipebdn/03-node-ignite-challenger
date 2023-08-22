import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { GetInfoPetUseCase } from '../get-info-pet'
import { PrismaImagesRepository } from '@/repositories/prisma/prisma-images-repository'

export function MakeGetInfoPetUseCase() {
  const prismaPetsRespository = new PrismaPetsRepository()
  const prismaImagesRepository = new PrismaImagesRepository()
  const getInfoPetUseCase = new GetInfoPetUseCase(
    prismaPetsRespository,
    prismaImagesRepository,
  )

  return getInfoPetUseCase
}
