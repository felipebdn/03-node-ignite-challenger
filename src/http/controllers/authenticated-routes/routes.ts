import { FastifyInstance } from 'fastify'
import { petRegister } from './pet-register'
import { VerifyJWT } from '@/http/middlewares/verify-jwt'
import { uploadRoute } from './upload'
import { petRegisterSchema } from '@/swagger-schemas/pet-register'
import { uploadImageSchema } from '@/swagger-schemas/upload-image-schema'
import { deleteImageRoute } from './delete-image'
import { updateOrg } from './update-org'

export async function authRoutes(app: FastifyInstance) {
  app.addHook('onRequest', VerifyJWT)

  app.post('/pets', petRegisterSchema, petRegister)

  app.post('/upload/:id', uploadImageSchema, uploadRoute)

  app.delete('/pet/image/:key', deleteImageRoute)

  app.post('/org/update/:id', updateOrg)
}
