import { MakeGetInfoPetUseCase } from '@/use-cases/factories/make-get-info-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function GetInfoPet(req: FastifyRequest, res: FastifyReply) {
  const queryParamsSchema = z.object({
    id: z.coerce.string(),
  })

  const { id } = queryParamsSchema.parse(req.params)

  const getInfoPetUseCase = MakeGetInfoPetUseCase()

  const pets = await getInfoPetUseCase.execute(id)

  return res.status(200).send(pets)
}
