import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateOrg } from 'test/utils/create-and-authenticate-org'

describe('Get Info Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get info of pet', async () => {
    await createAndAuthenticateOrg(app)
    const user = await prisma.org.findFirstOrThrow()

    await prisma.pet.create({
      data: {
        name: 'example1',
        energy_level: 3,
        size: 'small',
        age: 'adolescent',
        description: 'example',
        independence: 'medium',
        environment: 'example',
        requirements: 'example',
        org_id: user.id,
      },
    })
    const pet = await prisma.pet.create({
      data: {
        name: 'example',
        energy_level: 3,
        size: 'small',
        age: 'adolescent',
        description: 'example',
        independence: 'medium',
        environment: 'example',
        requirements: 'example',
        org_id: user.id,
      },
    })

    const res = await request(app.server).get(`/pet/${pet.id}`).send()

    expect(res.statusCode).toEqual(200)
    expect(res.body.pet).toEqual(
      expect.objectContaining({
        name: 'example',
        id: pet.id,
      }),
    )
  })
})
