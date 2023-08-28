import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Refresh Token (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh a token', async () => {
    await request(app.server).post('/orgs').send({
      name: 'Felipe 1',
      organization: 'teste 1',
      email: 'teste@example.com',
      state: 'PA',
      number: '1370',
      road: 'nova prata',
      sector: 'alto parana',
      city: 'Conceição do Araguaia',
      cep: '84874000',
      whatsapp: '(94) 99148-7963',
      password: '123456',
    })

    const authRes = await request(app.server).post('/sessions').send({
      email: 'teste@example.com',
      password: '123456',
    })

    const cookie = authRes.get('Set-Cookie')

    const res = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookie)
      .send()

    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual({
      token: expect.any(String),
    })
    expect(res.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
