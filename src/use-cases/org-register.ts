import { OrgsRepository } from '@/repositories/orgs-repository'
import { hash } from 'bcryptjs'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'
import { Org } from '@prisma/client'

interface OrgRegisterUseCaseRequest {
  name: string
  organization: string
  email: string
  state: string
  city: string
  cep: number
  road: string
  number: string
  sector: string
  whatsapp: string
  password: string
}

interface OrgRegisterUseCaseResponse {
  org: Org
}

export class OrgRegisterUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute(
    data: OrgRegisterUseCaseRequest,
  ): Promise<OrgRegisterUseCaseResponse> {
    const orgWithSameEmail = await this.orgsRepository.findByEmail(data.email)

    if (orgWithSameEmail) {
      throw new OrgAlreadyExistsError()
    }

    const password_hash = await hash(data.password, 6)

    const {
      cep,
      city,
      email,
      name,
      sector,
      organization,
      state,
      whatsapp,
      number,
      road,
    } = data

    const org = await this.orgsRepository.create({
      cep,
      city,
      email,
      name,
      number,
      sector,
      road,
      organization,
      password_hash,
      state,
      whatsapp,
    })
    return { org }
  }
}
