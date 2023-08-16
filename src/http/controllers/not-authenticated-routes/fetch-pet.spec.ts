import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'

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
          collar: '1',
          name: 'wallison',
          energy_level: 3,
          size: 'small',
          age: 'adolescent',
          description: 'z.string()',
          independence: 'medium',
          anvironment: 'lugares pequenos',
          org_id: user.id,
        },
        {
          collar: '2',
          name: 'wallison',
          energy_level: 3,
          size: 'medium',
          age: 'elderly',
          description: 'z.string()',
          independence: 'high',
          anvironment: 'lugares pequenos',
          org_id: user.id,
        },
      ],
    })

    const res = await request(app.server)
      .get('/pets')
      .query({
        state: 'PA',
        city: 'Conceição do Araguaia',
      })
      .send()

    expect(res.statusCode).toEqual(200)
    expect(res.body.pets).toHaveLength(2)
    expect(res.body.pets).toEqual([
      expect.objectContaining({
        collar: '1',
      }),
      expect.objectContaining({
        collar: '2',
      }),
    ])

    const res1 = await request(app.server)
      .get('/pets')
      .query({
        state: 'PA',
        city: 'Conceição do Araguaia',
        size: 'medium',
      })
      .send()

    expect(res1.statusCode).toEqual(200)
    expect(res1.body.pets).toHaveLength(1)
    expect(res1.body.pets).toEqual([
      expect.objectContaining({
        collar: '2',
      }),
    ])
  })
})
