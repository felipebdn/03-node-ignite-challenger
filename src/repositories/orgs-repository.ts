import { Org, Prisma } from '@prisma/client'

type findById = {
  id: string
  name: string
  organization: string
  road: string
  number: string
  sector: string
  city: string
  state: string
  cep: number
  whatsapp: string
}

export interface OrgsRepository {
  findByEmail(email: string): Promise<Org | null>
  findById(id: string): Promise<findById | null>
  create(data: Prisma.OrgCreateInput): Promise<Org>
  findByStateAndCidy(state: string, city: string): Promise<Org[] | null>
}
