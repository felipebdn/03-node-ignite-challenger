import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Fetch Pets (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search pets from location', async () => {
    const res = await request(app.server).get('/pets').send({
      state: 'PA',
      city: 'Redenção',
    })

    console.log(res.body)

    expect(res.statusCode).toEqual(200)
  })
})
