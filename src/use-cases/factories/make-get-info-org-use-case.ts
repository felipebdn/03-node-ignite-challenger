import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { GetInfoOrgUseCase } from '../get-info-org'

export function MakeGetInfoOrgUseCase() {
  const prismaOrgsRepository = new PrismaOrgsRepository()
  const makeGetInfoOrgUseCase = new GetInfoOrgUseCase(prismaOrgsRepository)
  return makeGetInfoOrgUseCase
}
