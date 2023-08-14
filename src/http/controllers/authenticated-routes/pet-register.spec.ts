import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'

describe('Register Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register pet', async () => {
    const { token } = await createAndAuthenticateOrg(app)

    const res = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        collar: '1261',
        name: 'wallison',
        energy_level: 3,
        size: 'small',
        age: 'adolescent',
        description: 'z.string()',
        independence: 'medium',
        anvironment: 'lugares pequenos',
        org_id: '0fe3203d-1b1f-4581-bd69-1ab50bfd7e95',
      })

    expect(res.statusCode).toEqual(201)
  })
})