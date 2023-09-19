import { FastifyReply, FastifyRequest } from 'fastify'
import { makePetRegisterUseCase } from '@/use-cases/factories/make-register-pet-use-case'
import { z } from 'zod'
import { PetAlreadyExistsError } from '@/use-cases/errors/pet-already-exists-error'

export async function petRegister(req: FastifyRequest, res: FastifyReply) {
  const petBodySchema = z.object({
    name: z.string().nonempty('None empty'),
    energy_level: z.coerce.number().min(1).max(5),
    size: z.enum(['small', 'medium', 'big']),
    age: z.enum(['cub', 'adolescent', 'elderly']),
    description: z.string().nonempty('None empty'),
    independence: z.enum(['low', 'medium', 'high']),
    anvironment: z.string().nonempty('None empty'),
    requirements: z.string().optional(),
  })
  const data = petBodySchema.parse(req.body)

  const petRegisterUseCase = makePetRegisterUseCase()

  try {
    await petRegisterUseCase.execute({
      data: {
        ...data,
        org_id: req.user.sub,
      },
    })
  } catch (err) {
    if (err instanceof PetAlreadyExistsError) {
      return res.status(409).send({ message: err.message })
    }
    throw err
  }

  return res.status(201).send()
}
