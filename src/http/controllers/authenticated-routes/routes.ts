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
import { deleteImage } from '@/swagger-schemas/delete-image-schema'
import { updatePetSchema } from '@/swagger-schemas/update-pet-schema'
import { deletePetSchema } from '@/swagger-schemas/delete-pet-schema'

export async function authRoutes(app: FastifyInstance) {
  app.addHook('onRequest', VerifyJWT)

  app.post('/upload/:id', uploadImageSchema, uploadRoute)

  app.post('/pet/register', petRegisterSchema, petRegister)

  app.delete('/pet/image/:key', deleteImage, deleteImageRoute)

  app.put('/pet/update/:id', updatePetSchema, updatePet)

  app.delete('/pet/:id', deletePetSchema, deletePet)

  app.put('/org/update/:id', updatePetSchema, updateOrg)
}
