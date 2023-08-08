import { makePestAroundCityUseCase } from '@/use-cases/factories/make-pets-around-city-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function FetchPets(req: FastifyRequest, res: FastifyReply) {
  const queryParamsSchema = z.object({
    state: z.string().length(2),
    city: z.string(),
    age: z.string().optional(),
    energy_level: z.coerce.number().min(1).max(5).optional(),
    size: z.string().optional(),
    independence: z.string().optional(),
  })

  const data = queryParamsSchema.parse(req.query)

  const pestAroundCityUseCase = makePestAroundCityUseCase()

  const pets = await pestAroundCityUseCase.execute(data)

  return res.status(200).send(pets)
}
