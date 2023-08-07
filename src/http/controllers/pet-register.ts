import { makePetRegisterUseCase } from '@/use-cases/factories/make-pet-register-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function petRegister(req: FastifyRequest, res: FastifyReply) {
  const petBodySchema = z.object({
    collar: z.string(),
    name: z.string(),
    energy_level: z.coerce.number().min(1).max(5),
    size: z.enum(['small', 'medium', 'big']),
    age: z.enum(['cub', 'adolescent', 'elderly']),
    description: z.string(),
    independence: z.enum(['low', 'medium', 'high']),
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
