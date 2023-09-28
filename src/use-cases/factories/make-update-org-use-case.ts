import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { UpdateOrgUseCase } from '../update-org'

export function MakeUpdateOrgUseCase() {
  const prismaOrgsRepository = new PrismaOrgsRepository()
  const updateOrgUseCase = new UpdateOrgUseCase(prismaOrgsRepository)

  return updateOrgUseCase
}
