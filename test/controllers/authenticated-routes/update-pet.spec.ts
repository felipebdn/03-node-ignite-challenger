import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateOrg } from 'test/utils/create-and-authenticate-org'
import { prisma } from '@/lib/prisma'

describe('Update Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to update pet', async () => {
    const { token } = await createAndAuthenticateOrg(app)

    await request(app.server)
      .post('/pet/register')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'example',
        energy_level: 3,
        size: 'small',
        age: 'adolescent',
        description: 'example',
        independence: 'medium',
        requirements: 'example',
        environment: 'example environment',
      })

    const pet = await prisma.pet.findFirstOrThrow()

    const response = await request(app.server)
      .put(`/pet/update/${pet.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'example 1',
        energy_level: 2,
        size: 'big',
        age: 'elderly',
        description: 'example',
        independence: 'low',
        requirements: 'example',
        environment: 'example environment',
      })

    const petAfterUpadate = await prisma.pet.findFirstOrThrow()
    expect(response.statusCode).toEqual(201)
    expect(petAfterUpadate).toEqual({
      id: expect.any(String),
      name: 'example 1',
      energy_level: 2,
      size: 'big',
      age: 'elderly',
      description: 'example',
      independence: 'low',
      requirements: 'example',
      environment: 'example environment',
      org_id: expect.any(String),
    })
  })
})
