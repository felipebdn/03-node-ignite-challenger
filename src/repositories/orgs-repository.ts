import { Org, Prisma } from '@prisma/client'

type orgWithOutPasswordHash = {
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
}

export interface OrgsRepository {
  findByEmail(email: string): Promise<Org | null>
  findByWhatsapp(whatsapp: string): Promise<Org | null>
  findById(id: string): Promise<orgWithOutPasswordHash | null>
  create(data: Prisma.OrgCreateInput): Promise<Org>
  findByStateAndCidy(state: string, city: string): Promise<Org[] | null>
  updateOrg(data: orgWithOutPasswordHash): Promise<Org>
}
