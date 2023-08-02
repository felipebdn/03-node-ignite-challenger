import { prisma } from '@/lib/prisma'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { hash } from 'bcryptjs'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error-'

interface OrgRegisterUseCaseProps {
  name: string
  organization: string
  email: string
  state: string
  city: string
  cep: number
  whatsapp: string
  password: string
}

export class OrgRegisterUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute(data: OrgRegisterUseCaseProps) {
    const orgWithSameEmail = await this.orgsRepository.findByEmail(data.email)

    if (orgWithSameEmail) {
      throw new OrgAlreadyExistsError()
    }

    const password_hash = await hash(data.password, 6)

    const { cep, city, email, name, organization, state, whatsapp } = data

    await this.orgsRepository.create({
      cep,
      city,
      email,
      name,
      organization,
      password_hash,
      state,
      whatsapp,
    })
  }
}
