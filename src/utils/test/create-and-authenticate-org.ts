import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateOrg(app: FastifyInstance) {
  await request(app.server).post('/orgs').send({
    name: 'Felipe 1',
    organization: 'teste 1',
    email: 'teste@example.com',
    state: 'PA',
    city: 'Conceição do Araguaia',
    number: '1370',
    road: 'nova prata',
    sector: 'alto parana',
    cep: '84874000',
    whatsapp: '(94) 99148-7963',
    password: '123456',
  })

  const authRes = await request(app.server).post('/sessions').send({
    email: 'teste@example.com',
    password: '123456',
  })

  const { token } = authRes.body

  return { token }
}
