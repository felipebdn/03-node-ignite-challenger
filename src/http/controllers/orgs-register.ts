import { orgRegisterUseCase } from '@/use-cases/org-register-use-case'
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
    await orgRegisterUseCase(data)
  } catch (err) {
    return res.status(409).send()
  }

  res.status(201).send()
}
