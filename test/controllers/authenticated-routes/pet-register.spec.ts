import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateOrg } from 'test/utils/create-and-authenticate-org'

describe('Register Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register pet', async () => {
    const { token } = await createAndAuthenticateOrg(app)

    const response = await request(app.server)
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
        environment: 'example',
      })

    expect(response.statusCode).toEqual(201)
  })
})
