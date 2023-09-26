import { Org, Prisma } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []

  async updateOrg(data: {
    id: string
    name: string
    email: string
    organization: string
    road: string
    number: string
    sector: string
    city: string
    state: string
    cep: number
    whatsapp: string
  }) {
    const currentIndex = this.items.findIndex((item) => item.id === data.id)

    this.items[currentIndex] = {
      id: this.items[currentIndex].id,
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
      password_hash: this.items[currentIndex].password_hash,
    }
    return this.items[currentIndex]
  }

  async findByWhatsapp(whatsapp: string) {
    const org = this.items.find((item) => item.whatsapp === whatsapp)
    if (!org) {
      return null
    }
    return org
  }

  async findById(id: string) {
    const org = this.items.find((item) => item.id === id)
    if (!org) {
      return null
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password_hash: _, ...data } = org
    return data
  }

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
