import { orgAuthenticate } from './controllers/org-authenticate'
import { orgRegister } from './controllers/org-register'
import { FastifyInstance } from 'fastify'
import { petRegister } from './controllers/pet-register'

export async function appRoutes(app: FastifyInstance) {
  app.post('/orgs', orgRegister)
  app.post('/sessions', orgAuthenticate)
  app.post('/pets', petRegister)
}
