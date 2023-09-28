import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { MakeUpdatePetUseCase } from '@/use-cases/factories/make-update-pet-use-case'

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
  const { id } = petIdParamSchema.parse(req.params)
  const data = petBodySchema.parse(req.body)

  const updatePetUseCase = MakeUpdatePetUseCase()

  const resData = await updatePetUseCase.execute({
    data,
    petId: id,
  })

  return res.status(201).send(resData.pet)
}
