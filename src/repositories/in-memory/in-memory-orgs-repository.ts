import { Org, Prisma } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryOrgsRepository implements OrgsRepository {
  async findById(id: string) {
    const org = this.items.find((item) => item.id === id)
    if (!org) {
      return null
    }
    return org
  }

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
      number: data.number,
      road: data.road,
      sector: data.sector,
      city: data.city,
      cep: data.cep,
      whatsapp: data.whatsapp,
      password_hash: data.password_hash,
    }

    this.items.push(org)

    return org
  }

  async findByStateAndCidy(state: string, city: string) {
    const orgs = this.items.filter((item) => {
      return item.city === city && item.state === state
    })

    if (!orgs) {
      return null
    }

    return orgs
  }
}
