import { PrismaImagesRepository } from '@/repositories/prisma/prisma-images-repository'
import { DeleteImageUseCase } from '../delete-image'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'

export function MakeDeleteImagesUseCase() {
  const prismaImagesRepository = new PrismaImagesRepository()
  const prismaPetsRepository = new PrismaPetsRepository()
  const deleteImageUseCase = new DeleteImageUseCase(
    prismaImagesRepository,
    prismaPetsRepository,
  )

  return deleteImageUseCase
}
