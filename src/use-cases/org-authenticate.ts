import { OrgsRepository } from '@/repositories/orgs-repository'
import { OrgInvalidCredentialError } from './errors/org-invalid-credentials-error'
import { compare } from 'bcryptjs'
import { Org } from '@prisma/client'

interface OrgAuthenticateUseCaseRequest {
  email: string
  password: string
}
interface OrgAuthenticateUseCaseResponse {
  org: Org
}

export class OrgAuthenticateUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    email,
    password,
  }: OrgAuthenticateUseCaseRequest): Promise<OrgAuthenticateUseCaseResponse> {
    const org = await this.orgsRepository.findByEmail(email)
    if (!org) {
      throw new OrgInvalidCredentialError()
    }
    const doesPasswordMatches = await compare(password, org.password_hash)
    if (!doesPasswordMatches) {
      throw new OrgInvalidCredentialError()
    }
    return { org }
  }
}
