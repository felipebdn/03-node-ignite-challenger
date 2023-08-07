import { makePestAroundCityUseCase } from '@/use-cases/factories/make-pets-around-city-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function FetchPets(req: FastifyRequest, res: FastifyReply) {
  const queryParamsSchema = z.object({
    state: z.string().length(2),
    city: z.string(),
    age: z.string(),
    energy_level: z.coerce.number(),
    size: z.string(),
    independence: z.string(),
  })

  const data = queryParamsSchema.parse(req.query)

  const pestAroundCityUseCase = makePestAroundCityUseCase()

  const pets = await pestAroundCityUseCase.execute(data)

  return res.status(200).send(pets)
}
