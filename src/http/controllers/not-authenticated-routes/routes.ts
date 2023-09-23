import { FastifyInstance } from 'fastify'
import { FetchPets } from './fetch-pets'
import { orgAuthenticate } from './org-authenticate'
import { orgRegister } from './org-register'
import { GetInfoPet } from './get-info-pet'
import { refreshToken } from './refresh-token'
import { orgsRegisterSchema } from '@/swagger-schemas/orgs-register'
import { orgAuthenticateSchema } from '@/swagger-schemas/org-authenticate'

export async function notAuthRoutes(app: FastifyInstance) {
  app.post('/orgs', orgsRegisterSchema, orgRegister)
  app.post('/sessions', orgAuthenticateSchema, orgAuthenticate)
  app.get('/pets', FetchPets)
  app.get('/pet/:id', GetInfoPet)
  app.patch('/token/refresh', refreshToken)
}
