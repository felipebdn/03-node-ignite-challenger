import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { prisma } from '@/lib/prisma'

describe('Get Info Org (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get info of Org', async () => {
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

    const org = await prisma.org.findFirstOrThrow()

    const response = await request(app.server).get(`/org/${org.id}`)

    expect(response.statusCode).toEqual(201)
    expect(response.body).toEqual(
      expect.objectContaining({
        email: 'teste@example.com',
      }),
    )
  })
  it('should be able to get info of Org', async () => {
    const response = await request(app.server).get(`/org/exampleid`)

    expect(response.statusCode).toEqual(400)
    expect(response.text).toEqual('Org not found.')
  })
})
