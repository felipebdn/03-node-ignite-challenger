import { FastifyInstance } from 'fastify'
import { petRegister } from './pet-register'
import { VerifyJWT } from '@/http/middlewares/verify-jwt'
import { uploadRoute } from './upload'

export async function authRoutes(app: FastifyInstance) {
  app.addHook('onRequest', VerifyJWT)

  app.post('/pets', petRegister)

  app.post('/upload/:id', uploadRoute)
}
