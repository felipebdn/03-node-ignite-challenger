import { Prisma } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'
import { prisma } from '@/lib/prisma'

export class PrismaOrgsRepository implements OrgsRepository {
  async updateOrg(data: Prisma.OrgCreateInput, id: string) {
    const org = await prisma.org.update({
      where: {
        id,
      },
      data,
    })
    return org
  }

  async findByWhatsapp(whatsapp: string) {
    const org = await prisma.org.findUnique({
      where: {
        whatsapp,
      },
    })
    return org
  }

  async findById(id: string) {
    const org = await prisma.org.findUnique({
      select: {
        cep: true,
        city: true,
        id: true,
        name: true,
        organization: true,
        road: true,
        sector: true,
        state: true,
        number: true,
        whatsapp: true,
      },
      where: {
        id,
      },
    })
    return org
  }

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
        number: data.number,
        road: data.road,
        sector: data.sector,
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
