import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists-error'
import { OrgAlreadyUsingWhatsappError } from '@/use-cases/errors/org-already-using-whatsapp'
import { MakeUpdateOrgUseCase } from '@/use-cases/factories/make-update-org-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function updateOrg(req: FastifyRequest, res: FastifyReply) {
  const updateOrgSchema = z.object({
    name: z.string().nonempty('None empty'),
    organization: z.string().nonempty('None empty'),
    email: z.string().email().nonempty('None empty'),
    state: z
      .string()
      .toUpperCase()
      .length(2, 'State field receives the state acronym.'),
    city: z.string().nonempty('None empty'),
    cep: z.coerce
      .number()
      .refine(
        (value) => value.toString().length === 8,
        'A zip code has 8 numbers.',
      ),
    number: z
      .number()
      .optional()
      .transform((value) => {
        if (!value) {
          return 'S/n'
        }
        return value.toString()
      }),
    road: z.string().nonempty('None empty'),
    sector: z.string().nonempty('None empty'),
    whatsapp: z
      .number()
      .refine(
        (value) => value.toString().length === 11,
        'Contact number must be 11 digits long.',
      )
      .transform((value) => value.toString()),
  })
  const idParamsSchema = z.object({
    id: z.string(),
  })
  const { id } = idParamsSchema.parse(req.params)

  const data = updateOrgSchema.parse(req.body)

  try {
    const makeUpdateOrgUseCase = MakeUpdateOrgUseCase()
    const resData = await makeUpdateOrgUseCase.execute({ data, orgId: id })

    return res.status(201).send(resData.org)
  } catch (err) {
    if (err instanceof OrgAlreadyExistsError) {
      return res.status(409).send({ message: err.message })
    } else if (err instanceof OrgAlreadyUsingWhatsappError) {
      return res.status(409).send({ message: err.message })
    }
    throw err
  }
}
