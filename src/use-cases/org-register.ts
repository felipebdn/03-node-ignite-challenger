import { OrgsRepository } from '@/repositories/orgs-repository'
import { hash } from 'bcryptjs'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'
import { OrgAlreadyUsingWhatsappError } from './errors/org-already-using-whatsapp'

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
  org: {
    id: string
    name: string
    organization: string
    email: string
    road: string
    number: string
    sector: string
    city: string
    state: string
    cep: number
    whatsapp: string
  }
}

export class OrgRegisterUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute(
    data: OrgRegisterUseCaseRequest,
  ): Promise<OrgRegisterUseCaseResponse> {
    const orgWithSameEmail = await this.orgsRepository.findByEmail(data.email)
    const orgWithSameWhatsapp = await this.orgsRepository.findByWhatsapp(
      data.whatsapp,
    )

    if (orgWithSameEmail) {
      throw new OrgAlreadyExistsError()
    }

    if (orgWithSameWhatsapp) {
      throw new OrgAlreadyUsingWhatsappError()
    }

    const passwordHash = await hash(data.password, 6)

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

    const orgCreate = await this.orgsRepository.create({
      cep,
      city,
      email,
      name,
      number,
      sector,
      road,
      organization,
      password_hash: passwordHash,
      state,
      whatsapp,
    })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password_hash, ...org } = orgCreate

    return { org }
  }
}
