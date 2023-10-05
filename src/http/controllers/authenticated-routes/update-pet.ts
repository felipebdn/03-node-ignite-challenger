import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { MakeUpdatePetUseCase } from '@/use-cases/factories/make-update-pet-use-case'
import { OperationNotAuthorizedError } from '@/use-cases/errors/operation-not-authorized-error'

export async function updatePet(req: FastifyRequest, res: FastifyReply) {
  const petBodySchema = z.object({
    name: z.string().nonempty('None empty'),
    energy_level: z.coerce.number().min(1).max(5),
    size: z.enum(['small', 'medium', 'big']),
    age: z.enum(['cub', 'adolescent', 'elderly']),
    description: z.string().nonempty('None empty'),
    independence: z.enum(['low', 'medium', 'high']),
    environment: z.string().nonempty('None empty'),
    requirements: z.string().optional().default('empty'),
  })
  const petIdParamSchema = z.object({
    id: z.string(),
  })
  const data = petBodySchema.parse(req.body)
  const { id } = petIdParamSchema.parse(req.params)

  const updatePetUseCase = MakeUpdatePetUseCase()

  try {
    const resData = await updatePetUseCase.execute({
      data,
      petId: id,
      org_id: req.user.sub,
    })
    return res.status(201).send(resData.pet)
  } catch (err) {
    if (err instanceof OperationNotAuthorizedError) {
      return res.status(400).send({ message: err.message })
    }
  }
}
