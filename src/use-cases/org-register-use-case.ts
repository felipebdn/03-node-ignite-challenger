import { prisma } from '@/lib/prisma'
import { PrismaOrgsRepository } from '@/repositories/prisma-orgs-repositories'
import { hash } from 'bcryptjs'

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

export async function orgRegisterUseCase(data: OrgRegisterUseCaseProps) {
  const orgWithSameEmail = await prisma.org.findUnique({
    where: {
      email: data.email,
    },
  })

  if (orgWithSameEmail) {
    throw new Error('E-mail already exists.')
  }

  const password_hash = await hash(data.password, 6)

  const prismaUserRepository = new PrismaOrgsRepository()

  await prismaUserRepository.create({
    password_hash,
    ...data,
  })
}
