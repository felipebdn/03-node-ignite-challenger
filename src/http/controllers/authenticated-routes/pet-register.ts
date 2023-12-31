import { FastifyReply, FastifyRequest } from 'fastify'
import { makePetRegisterUseCase } from '@/use-cases/factories/make-register-pet-use-case'
import { z } from 'zod'

export async function petRegister(req: FastifyRequest, res: FastifyReply) {
  const petBodySchema = z.object({
    name: z.string().nonempty('None empty'),
    energy_level: z.coerce.number().min(1).max(5),
    size: z.enum(['small', 'medium', 'big']),
    age: z.enum(['cub', 'adolescent', 'elderly']),
    description: z.string().nonempty('None empty'),
    independence: z.enum(['low', 'medium', 'high']),
    environment: z.string().nonempty('None empty'),
    requirements: z.string().optional().default('Empty'),
  })
  const data = petBodySchema.parse(req.body)

  const petRegisterUseCase = makePetRegisterUseCase()

  const resData = await petRegisterUseCase.execute({
    data: {
      ...data,
      org_id: req.user.sub,
    },
  })

  return res.status(201).send(resData.pet)
}
