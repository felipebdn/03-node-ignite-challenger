import { OrgNotFoundError } from '@/use-cases/errors/org-not-found'
import { MakeGetInfoOrgUseCase } from '@/use-cases/factories/make-get-info-org-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function GetInfoOrg(req: FastifyRequest, res: FastifyReply) {
  const getParamsSchema = z.object({
    id: z.string(),
  })
  const { id } = getParamsSchema.parse(req.params)
  const makeGetInfoOrgUseCase = MakeGetInfoOrgUseCase()
  try {
    const org = await makeGetInfoOrgUseCase.execute(id)
    return res.status(201).send(org)
  } catch (err) {
    if (err instanceof OrgNotFoundError) {
      return res.status(400).send(err.message)
    }
  }
}
