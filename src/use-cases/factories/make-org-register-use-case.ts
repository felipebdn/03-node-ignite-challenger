import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { OrgRegisterUseCase } from '../org-register'

export function makeOrgRegisterUseCase() {
  const prismaOrgsRepository = new PrismaOrgsRepository()
  const orgRegisterUseCase = new OrgRegisterUseCase(prismaOrgsRepository)

  return orgRegisterUseCase
}
