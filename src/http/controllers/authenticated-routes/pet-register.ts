import { FastifyReply, FastifyRequest } from 'fastify'
import { makePetRegisterUseCase } from '@/use-cases/factories/make-register-pet-use-case'
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
  })
  const data = petBodySchema.parse(req.body)

  const requirements = [{ title: 'teste' }]
  try {
    const petRegisterUseCase = makePetRegisterUseCase()
    await petRegisterUseCase.execute({
      data: {
        ...data,
        org_id: req.user.sub,
      },
      requirements,
    })
  } catch (err) {
    res.status(400).send()
  }
  return res.status(201).send()
}
