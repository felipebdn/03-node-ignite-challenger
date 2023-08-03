import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { OrgAuthenticateUseCase } from '../org-authenticate'

export function MakeOrgAuthenticateUseCase() {
  const prismaOrgsRepository = new PrismaOrgsRepository()
  const orgAuthenticateUseCase = new OrgAuthenticateUseCase(
    prismaOrgsRepository,
  )

  return orgAuthenticateUseCase
}
