import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateOrg(app: FastifyInstance) {
  await request(app.server).post('/orgs').send({
    name: 'example',
    organization: 'org example',
    email: 'teste@example.com',
    state: 'PA',
    city: 'city example',
    number: 1,
    road: 'road example',
    sector: 'sector example',
    cep: 12345678,
    whatsapp: 12345678910,
    password: '123456',
  })

  const authRes = await request(app.server).post('/sessions').send({
    email: 'teste@example.com',
    password: '123456',
  })

  const { token } = authRes.body

  return { token }
}
