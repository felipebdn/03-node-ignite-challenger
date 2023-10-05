import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists-error'
import { makeOrgRegisterUseCase } from '@/use-cases/factories/make-org-register-use-case'
import { OrgAlreadyUsingWhatsappError } from '@/use-cases/errors/org-already-using-whatsapp'

export async function orgRegister(req: FastifyRequest, res: FastifyReply) {
  const registerOrgSchema = z.object({
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
    password: z.string().min(6),
  })

  const data = registerOrgSchema.parse(req.body)

  try {
    const orgRegisterUseCase = makeOrgRegisterUseCase()

    const { org } = await orgRegisterUseCase.execute(data)

    res.status(201).send(org)
  } catch (err) {
    if (err instanceof OrgAlreadyExistsError) {
      return res.status(409).send({ message: err.message })
    } else if (err instanceof OrgAlreadyUsingWhatsappError) {
      return res.status(409).send({ message: err.message })
    }
    throw err
  }
}
