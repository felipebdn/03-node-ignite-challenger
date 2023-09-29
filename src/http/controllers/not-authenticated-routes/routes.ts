import { FastifyInstance } from 'fastify'
import { FetchPets } from './fetch-pets'
import { orgAuthenticate } from './org-authenticate'
import { orgRegister } from './org-register'
import { GetInfoPet } from './get-info-pet'
import { orgsRegisterSchema } from '@/swagger-schemas/orgs-register'
import { orgAuthenticateSchema } from '@/swagger-schemas/org-authenticate'
import { getInfoPetSchema } from '@/swagger-schemas/get-info-pet-schema'
import { fetchPetsSchema } from '@/swagger-schemas/fetch-pets-schema'
import { GetInfoOrg } from './get-info-org'

export async function notAuthRoutes(app: FastifyInstance) {
  app.post('/sessions', orgAuthenticateSchema, orgAuthenticate)
  app.post('/orgs', orgsRegisterSchema, orgRegister)
  app.get('/org/:id', GetInfoOrg)
  app.get('/pets', fetchPetsSchema, FetchPets)
  app.get('/pet/:id', getInfoPetSchema, GetInfoPet)
}
