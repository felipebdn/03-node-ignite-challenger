import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeSearchPetsUseCase } from '@/use-cases/factories/make-search-pets-use-case'

export async function FetchPets(req: FastifyRequest, res: FastifyReply) {
  const queryParamsSchema = z.object({
    state: z
      .string()
      .toUpperCase()
      .length(2, 'State field receives the state acronym.'),
    city: z.string().nonempty('None empty'),
    age: z.enum(['cub', 'adolescent', 'elderly']).optional(),
    energy_level: z.coerce.number().min(1).max(5).optional(),
    size: z.enum(['small', 'medium', 'big']).optional(),
    independence: z.enum(['low', 'medium', 'high']).optional(),
  })

  const data = queryParamsSchema.parse(req.query)

  const pestAroundCityUseCase = makeSearchPetsUseCase()

  const pets = await pestAroundCityUseCase.execute(data)

  return res.status(200).send(pets)
}
