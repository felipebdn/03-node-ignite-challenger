import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repositories'
import { OrgAuthenticateUseCase } from '../org-authenticate'

export function MakeOrgAuthenticateUseCase() {
  const prismaOrgsRepository = new PrismaOrgsRepository()
  const orgAuthenticateUseCase = new OrgAuthenticateUseCase(
    prismaOrgsRepository,
  )

  return orgAuthenticateUseCase
}
