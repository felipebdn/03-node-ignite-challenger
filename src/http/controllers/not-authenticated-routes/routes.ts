import { FastifyInstance } from 'fastify'
import { FetchPets } from './fetch-pets'
import { orgAuthenticate } from './org-authenticate'
import { orgRegister } from './org-register'

export async function notAuthRoutes(app: FastifyInstance) {
  app.post('/orgs', orgRegister)
  app.post('/sessions', orgAuthenticate)
  app.get('/pets', FetchPets)
}
