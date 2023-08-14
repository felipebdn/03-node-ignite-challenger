import { FastifyReply, FastifyRequest } from 'fastify'

export async function VerifyJWT(req: FastifyRequest, res: FastifyReply) {
  try {
    await req.jwtVerify()
  } catch (err) {
    return res.status(401).send({ message: 'Unauthorized' })
  }
}
