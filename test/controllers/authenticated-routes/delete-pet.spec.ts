import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'
import { createAndAuthenticateOrg } from 'test/utils/create-and-authenticate-org'
import { prisma } from '@/lib/prisma'
import request from 'supertest'

describe('Delete Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to remove pet from pets', async () => {
    const { token } = await createAndAuthenticateOrg(app)

    const org = await prisma.org.findFirstOrThrow()

    const pet = await prisma.pet.create({
      data: {
        name: 'wallison',
        energy_level: 3,
        size: 'small',
        age: 'adolescent',
        description: 'example',
        independence: 'medium',
        requirements: 'cuidado',
        environment: 'lugares pequenos',
        org_id: org.id,
      },
    })

    const response = await request(app.server)
      .delete(`/pet/${pet.id}`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toEqual(200)
  })

  it('should be able to give a pet not found error', async () => {
    const { token } = await createAndAuthenticateOrg(app)

    const response = await request(app.server)
      .delete(`/pet/testid`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toEqual(400)
  })

  it('should be able to make an unauthorized request as it is an Org not linked to the Pet', async () => {
    const { token } = await createAndAuthenticateOrg(app)

    await request(app.server).post('/orgs').send({
      name: 'example',
      organization: 'org example',
      email: 'teste1@example.com',
      state: 'PA',
      city: 'city example',
      number: 1,
      road: 'road example',
      sector: 'sector example',
      cep: 12345678,
      whatsapp: 12345678911,
      password: '123456',
    })

    const org = await prisma.org.findUniqueOrThrow({
      where: {
        email: 'teste1@example.com',
      },
    })

    const pet = await prisma.pet.create({
      data: {
        name: 'wallison',
        energy_level: 3,
        size: 'small',
        age: 'adolescent',
        description: 'example',
        independence: 'medium',
        requirements: 'cuidado',
        environment: 'lugares pequenos',
        org_id: org.id,
      },
    })

    const response = await request(app.server)
      .delete(`/pet/${pet.id}`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toEqual(400)
  })
})
