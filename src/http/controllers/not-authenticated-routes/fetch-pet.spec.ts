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

    const res = await request(app.server).get('/pets').send({
      state: 'PA',
      city: 'Redenção',
    })

    expect(res.statusCode).toEqual(200)
    expect(res.body.pets).toHaveLength(2)
    expect(res.body.pets).toEqual([
      expect.objectContaining({
        id: expect.any(String),
      }),
      expect.objectContaining({
        id: expect.any(String),
      }),
    ])
  })
})
