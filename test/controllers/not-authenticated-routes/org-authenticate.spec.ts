import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Authenticate Org (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await request(app.server).post('/orgs').send({
      name: 'example 1',
      organization: 'example 1',
      email: 'teste@example.com',
      number: 1370,
      road: 'example road',
      sector: 'example sector',
      state: 'PA',
      city: 'city example',
      cep: 12345678,
      whatsapp: 12345678910,
      password: '123456',
    })

    const res = await request(app.server).post('/sessions').send({
      email: 'teste@example.com',
      password: '123456',
    })

    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual({
      token: expect.any(String),
    })
  })
})
