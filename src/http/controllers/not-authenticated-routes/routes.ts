import { FastifyInstance } from 'fastify'
import { FetchPets } from './fetch-pets'
import { orgAuthenticate } from './org-authenticate'
import { orgRegister } from './org-register'
import { GetInfoPet } from './get-info-pet'
import { orgsRegisterSchema } from '@/swagger-schemas/orgs-register'
import { orgAuthenticateSchema } from '@/swagger-schemas/org-authenticate'
import { getInfoPetSchema } from '@/swagger-schemas/get-info-pet-schema'
import { fetchPetsSchema } from '@/swagger-schemas/fetch-pets-schema'

export async function notAuthRoutes(app: FastifyInstance) {
  app.post('/orgs', orgsRegisterSchema, orgRegister)
  app.post('/sessions', orgAuthenticateSchema, orgAuthenticate)
  app.get('/pets', fetchPetsSchema, FetchPets)
  app.get('/pet/:id', getInfoPetSchema, GetInfoPet)
}
