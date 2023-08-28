import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists-error'
import { makeOrgRegisterUseCase } from '@/use-cases/factories/make-org-register-use-case'

export async function orgRegister(req: FastifyRequest, res: FastifyReply) {
  const registerOrgSchema = z.object({
    name: z.string(),
    organization: z.string(),
    email: z.string().email(),
    state: z.string(),
    city: z.string(),
    cep: z.coerce.number(),
    number: z.string(),
    road: z.string(),
    sector: z.string(),
    whatsapp: z.string(),
    password: z.string().min(6),
  })

  const data = registerOrgSchema.parse(req.body)

  try {
    const orgRegisterUseCase = makeOrgRegisterUseCase()

    await orgRegisterUseCase.execute(data)
  } catch (err) {
    if (err instanceof OrgAlreadyExistsError) {
      return res.status(409).send({ message: err.message })
    }
    throw err
  }

  res.status(201).send()
}
