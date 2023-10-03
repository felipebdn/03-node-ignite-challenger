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
      name: 'example 1',
      organization: 'example 1',
      email: 'teste@example.com',
      state: 'PA',
      number: 1234,
      road: 'example road',
      sector: 'example sector',
      city: 'city example',
      cep: 12345678,
      whatsapp: 12345678910,
      password: '123456',
    })

    expect(res.statusCode).toEqual(201)
  })
})
