import { PrismaImagesRepository } from '@/repositories/prisma/prisma-images-repository'
import { UploadImagesUseCase } from '../upload-images'

export function MakeUploadImagesUseCase() {
  const prismaImagesRepository = new PrismaImagesRepository()
  const uploadImagesUseCase = new UploadImagesUseCase(prismaImagesRepository)

  return uploadImagesUseCase
}
