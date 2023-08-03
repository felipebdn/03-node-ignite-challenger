import { Org, Prisma } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []

  async findByEmail(email: string) {
    const org = this.items.find((item) => item.email === email)
    if (!org) {
      return null
    }
    return org
  }

  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: randomUUID(),
      name: data.name,
      organization: data.organization,
      email: data.email,
      state: data.state,
      city: data.city,
      cep: BigInt(data.cep),
      whatsapp: data.whatsapp,
      password_hash: data.password_hash,
    }

    this.items.push(org)

    return org
  }
}