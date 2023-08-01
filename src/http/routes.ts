import { orgsRegister } from './controllers/orgs-register'
import { FastifyInstance } from 'fastify'

export async function appRoutes(app: FastifyInstance) {
  app.post('/orgs', orgsRegister)
}
