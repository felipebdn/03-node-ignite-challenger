import { Prisma } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'
import { prisma } from '@/lib/prisma'

export class PrismaOrgsRepository implements OrgsRepository {
  async findByEmail(email: string) {
    const org = await prisma.org.findUnique({
      where: {
        email,
      },
    })
    return org
  }

  async create(data: Prisma.OrgCreateInput) {
    const org = await prisma.org.create({
      data: {
        cep: data.cep,
        city: data.city,
        email: data.email,
        name: data.name,
        organization: data.organization,
        password_hash: data.password_hash,
        state: data.state,
        whatsapp: data.whatsapp,
      },
    })
    return org
  }

  async findByStateAndCidy(state: string, city: string) {
    const orgs = await prisma.org.findMany({
      where: {
        state,
        city,
      },
    })
    return orgs
  }
}
