import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { prisma } from '@/lib/prisma'
import { app } from '@/app'
import { createAndAuthenticateOrg } from 'test/utils/create-and-authenticate-org'

describe('Fetch Pets (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search pets from location', async () => {
    await createAndAuthenticateOrg(app)
    const user = await prisma.org.findFirstOrThrow()

    await prisma.pet.createMany({
      data: [
        {
          name: 'example',
          energy_level: 3,
          size: 'small',
          age: 'adolescent',
          description: 'example',
          independence: 'medium',
          environment: 'example',
          org_id: user.id,
          requirements: 'example',
        },
        {
          name: 'example',
          energy_level: 3,
          size: 'medium',
          age: 'elderly',
          description: 'example',
          independence: 'high',
          environment: 'example',
          org_id: user.id,
          requirements: 'example',
        },
      ],
    })

    const res = await request(app.server)
      .get('/pets')
      .query({
        state: 'PA',
        city: 'city example',
      })
      .send()

    expect(res.statusCode).toEqual(200)
    expect(res.body.pets).toHaveLength(2)

    const res1 = await request(app.server)
      .get('/pets')
      .query({
        state: 'PA',
        city: 'city example',
        size: 'medium',
      })
      .send()

    expect(res1.statusCode).toEqual(200)
    expect(res1.body.pets).toHaveLength(1)
  })
})
