import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { GetInfoPetUseCase } from '../get-info-pet'
import { PrismaImagesRepository } from '@/repositories/prisma/prisma-images-repository'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'

export function MakeGetInfoPetUseCase() {
  const prismaPetsRespository = new PrismaPetsRepository()
  const prismaImagesRepository = new PrismaImagesRepository()
  const prismaOrgsRepository = new PrismaOrgsRepository()
  const getInfoPetUseCase = new GetInfoPetUseCase(
    prismaPetsRespository,
    prismaImagesRepository,
    prismaOrgsRepository,
  )

  return getInfoPetUseCase
}
