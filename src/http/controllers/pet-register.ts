import { makePetRegisterUseCase } from '@/use-cases/factories/make-pet-register-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function petRegister(req: FastifyRequest, res: FastifyReply) {
  const petBodySchema = z.object({
    collar: z.string(),
    name: z.string(),
    energy_level: z.coerce.number(),
    size: z.string(),
    age: z.string(),
    description: z.string(),
    independence: z.string(),
    anvironment: z.string(),
    org_id: z.string(),
  })

  const data = petBodySchema.parse(req.body)

  const images = [{ url: 'teste1' }, { url: 'teste2' }]

  try {
    const petRegisterUseCase = makePetRegisterUseCase()

    await petRegisterUseCase.execute({ ...data, images })
  } catch (err) {
    console.log(err)
  }

  return res.status(201).send()
}
