import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repositories'
import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists-error-'
import { OrgRegisterUseCase } from '@/use-cases/org-register-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function orgsRegister(req: FastifyRequest, res: FastifyReply) {
  const registerOrgSchema = z.object({
    name: z.string(),
    organization: z.string(),
    email: z.string().email(),
    state: z.string(),
    city: z.string(),
    cep: z.coerce.number(),
    whatsapp: z.string(),
    password: z.string().min(6),
  })

  const data = registerOrgSchema.parse(req.body)

  try {
    const prismaOrgsRepository = new PrismaOrgsRepository()
    const orgRegisterUseCase = new OrgRegisterUseCase(prismaOrgsRepository)

    await orgRegisterUseCase.execute(data)
  } catch (err) {
    if (err instanceof OrgAlreadyExistsError) {
      return res.status(409).send({ message: err.message })
    }
    return res.status(500).send()
  }

  res.status(201).send()
}
