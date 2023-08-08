import { FastifyInstance } from 'fastify'
import { orgAuthenticate } from './controllers/org-authenticate'
import { orgRegister } from './controllers/org-register'
import { petRegister } from './controllers/pet-register'
import { FetchPets } from './controllers/fetch-pets'

export async function appRoutes(app: FastifyInstance) {
  app.post('/orgs', orgRegister)
  app.post('/sessions', orgAuthenticate)
  app.post('/pets', petRegister)
  app.get('/pets', FetchPets)
}
