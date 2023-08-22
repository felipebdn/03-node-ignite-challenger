// import { afterAll, beforeAll, describe, it } from 'vitest'
// import { app } from '@/app'
// import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'
// import request from 'supertest'

// describe('Upload Image (e2e)', () => {
//   beforeAll(async () => {
//     await app.ready()
//   })

//   afterAll(async () => {
//     await app.close()
//   })

//   it('should be able to upload Image', async () => {
//     const { token } = await createAndAuthenticateOrg(app)
//     const response = await request(app.server)
//       .post('/upload/:id')
//       .set('Authorization', `Bearer ${token}`)
//       .send({
//         collar: '1261',
//         name: 'wallison',
//         energy_level: 3,
//         size: 'small',
//         age: 'adolescent',
//         description: 'z.string()',
//         independence: 'medium',
//         requirements: 'cuidado',
//         anvironment: 'lugares pequenos',
//       })
//   })
// })
