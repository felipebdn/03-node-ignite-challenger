import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repositories'
import { OrgInvalidCredentialError } from '@/use-cases/errors/org-invalid-credentials-error'
import { OrgAuthenticateUseCase } from '@/use-cases/org-authenticate'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function orgAuthenticate(req: FastifyRequest, res: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const data = authenticateBodySchema.parse(req.body)

  try {
    const prismaOrgsRepository = new PrismaOrgsRepository()
    const orgAuthenticateUseCase = new OrgAuthenticateUseCase(
      prismaOrgsRepository,
    )

    await orgAuthenticateUseCase.execute(data)
  } catch (err) {
    if (err instanceof OrgInvalidCredentialError) {
      return res.status(400).send({ message: err.message })
    }
    throw err
  }

  res.status(200).send()
}
