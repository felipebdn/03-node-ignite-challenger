import { OrgInvalidCredentialError } from '@/use-cases/errors/org-invalid-credentials-error'
import { MakeOrgAuthenticateUseCase } from '@/use-cases/factories/make-org-authenticate-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function orgAuthenticate(req: FastifyRequest, res: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const data = authenticateBodySchema.parse(req.body)

  try {
    const orgAuthenticateUseCase = MakeOrgAuthenticateUseCase()
    const { org } = await orgAuthenticateUseCase.execute(data)
    const token = await res.jwtSign(
      {},
      {
        sign: {
          sub: org.id,
        },
      },
    )
    const refreshToken = await res.jwtSign(
      {},
      {
        sign: {
          sub: org.id,
          expiresIn: '7d',
        },
      },
    )
    res
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({ token })
  } catch (err) {
    if (err instanceof OrgInvalidCredentialError) {
      return res.status(400).send({ message: err.message })
    }
    throw err
  }
}
