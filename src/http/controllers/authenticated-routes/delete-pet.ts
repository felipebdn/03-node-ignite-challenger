import { PetNotFoundError } from '@/use-cases/errors/pet-not-found'
import { MakeDeletePetUseCase } from '@/use-cases/factories/make-delete-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function deletePet(req: FastifyRequest, res: FastifyReply) {
  const reqParamsSchema = z.object({
    id: z.string(),
  })
  const { id } = reqParamsSchema.parse(req.params)

  const makeDeletePetUseCase = MakeDeletePetUseCase()

  try {
    makeDeletePetUseCase.execute(id)
  } catch (err) {
    if (err instanceof PetNotFoundError) {
      return res.status(400).send(err.message)
    }
  }
  return res.status(200).send()
}
