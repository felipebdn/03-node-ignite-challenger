import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { OperationNotAuthorizedError } from '@/use-cases/errors/operation-not-authorized-error'
import { PetNotFoundError } from '@/use-cases/errors/pet-not-found'
import { MakeDeletePetUseCase } from '@/use-cases/factories/make-delete-pet-use-case'

export async function deletePet(req: FastifyRequest, res: FastifyReply) {
  const reqParamsSchema = z.object({
    id: z.string(),
  })
  const { id } = reqParamsSchema.parse(req.params)

  const makeDeletePetUseCase = MakeDeletePetUseCase()

  try {
    await makeDeletePetUseCase.execute(id, req.user.sub)
    return res.status(200).send()
  } catch (err) {
    if (err instanceof PetNotFoundError) {
      return res.status(400).send(err.message)
    } else if (err instanceof OperationNotAuthorizedError) {
      return res.status(401).send(err.message)
    }
  }
}
