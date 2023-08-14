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
      city: 'Conceição do Araguaia',
      cep: '84874000',
      whatsapp: '(94) 99148-7963',
      password: '123456',
    })

    expect(res.statusCode).toEqual(201)
  })
  it('should not be able to register Org, email already exists', async () => {
    await request(app.server).post('/orgs').send({
      name: 'Felipe 1',
      organization: 'teste 1',
      email: 'teste@example.com',
      state: 'PA',
      city: 'Conceição do Araguaia',
      cep: '84874000',
      whatsapp: '(94) 99148-7963',
      password: '123456',
    })

    const res = await request(app.server).post('/orgs').send({
      name: 'Felipe 1',
      organization: 'teste 1',
      email: 'teste@example.com',
      state: 'PA',
      city: 'Conceição do Araguaia',
      cep: '84874000',
      whatsapp: '(94) 99148-7964',
      password: '123456',
    })

    expect(res.statusCode).toEqual(409)
  })
})
