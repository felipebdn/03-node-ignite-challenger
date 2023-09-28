import { PrismaImagesRepository } from '@/repositories/prisma/prisma-images-repository'
import { DeleteImageUseCase } from '../delete-image'

export function MakeDeleteImagesUseCase() {
  const prismaImagesRepository = new PrismaImagesRepository()
  const deleteImageUseCase = new DeleteImageUseCase(prismaImagesRepository)

  return deleteImageUseCase
}
