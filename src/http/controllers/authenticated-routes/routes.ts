import { FastifyInstance } from 'fastify'
import { petRegister } from './pet-register'
import { VerifyJWT } from '@/http/middlewares/verify-jwt'
import { uploadRoute } from './upload'
import { petRegisterSchema } from '@/swagger-schemas/pet-register'
import { uploadImageSchema } from '@/swagger-schemas/upload-image-schema'
import { deleteImageRoute } from './delete-image'
import { updateOrg } from './update-org'
import { updatePet } from './update-pet'
import { deletePet } from './delete-pet'

export async function authRoutes(app: FastifyInstance) {
  app.addHook('onRequest', VerifyJWT)

  app.post('/upload/:id', uploadImageSchema, uploadRoute)

  app.post('/pet/register', petRegisterSchema, petRegister)

  app.delete('/pet/image/:key', deleteImageRoute)

  app.put('/pet/update/:id', updatePet)

  app.delete('/pet/:id', deletePet)

  app.put('/org/update/:id', updateOrg)
}
