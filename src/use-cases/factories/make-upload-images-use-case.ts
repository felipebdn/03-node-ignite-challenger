import { PrismaImagesRepository } from '@/repositories/prisma/prisma-images-repository'
import { UploadImagesUseCase } from '../upload-images'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'

export function MakeUploadImagesUseCase() {
  const prismaImagesRepository = new PrismaImagesRepository()
  const prismaPetsRepository = new PrismaPetsRepository()
  const uploadImagesUseCase = new UploadImagesUseCase(
    prismaImagesRepository,
    prismaPetsRepository,
  )

  return uploadImagesUseCase
}
