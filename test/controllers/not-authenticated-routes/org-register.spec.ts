import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Register Org (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register Org', async () => {
    const res = await request(app.server).post('/orgs').send({
      name: 'Felipe 1',
      organization: 'teste 1',
      email: 'teste@example.com',
      state: 'PA',
      number: 1370,
      road: 'nova prata',
      sector: 'alto parana',
      city: 'Conceição do Araguaia',
      cep: 84874000,
      whatsapp: 94991487963,
      password: '123456',
    })

    expect(res.statusCode).toEqual(201)
  })
})
