import { FastifyInstance } from 'fastify'
import { FetchPets } from './fetch-pets'
import { orgAuthenticate } from './org-authenticate'
import { orgRegister } from './org-register'
import { GetInfoPet } from './get-info-pet'
import { refreshToken } from './refresh-token'

export async function notAuthRoutes(app: FastifyInstance) {
  app.post('/orgs', orgRegister)
  app.post('/sessions', orgAuthenticate)
  app.get('/pets', FetchPets)
  app.get('/pet/:id', GetInfoPet)
  app.patch('/token/refresh', refreshToken)
}
