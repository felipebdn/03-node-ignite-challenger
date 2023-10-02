import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateOrg } from 'test/utils/create-and-authenticate-org'
import { prisma } from '@/lib/prisma'

describe('Update Org (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to update org', async () => {
    const { token } = await createAndAuthenticateOrg(app)

    const org = await prisma.org.findFirstOrThrow()

    const response = await request(app.server)
      .put(`/org/update/${org.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'example 1',
        organization: 'org example',
        email: 'teste1@example.com',
        state: 'PA',
        city: 'city example',
        number: 1,
        road: 'road example',
        sector: 'sector example',
        cep: 12345678,
        whatsapp: 12345678910,
      })

    expect(response.statusCode).toEqual(201)
  })
})
