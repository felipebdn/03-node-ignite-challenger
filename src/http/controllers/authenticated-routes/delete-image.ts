import { FastifyReply, FastifyRequest } from 'fastify'
import { DeleteObjectCommand } from '@aws-sdk/client-s3'
import { z } from 'zod'
import { env } from '@/env'
import { s3 } from '@/lib/s3'

export async function deleteImageRoute(req: FastifyRequest, res: FastifyReply) {
  const UploadRouteParamsSchema = z.object({
    key: z.string(),
  })

  const { key } = UploadRouteParamsSchema.parse(req.params)

  // const fileId = randomUUID()
  // const extension = extname(upload.filename)

  // const fileName = fileId.concat(extension)

  const deleteObjectCommand = new DeleteObjectCommand({
    Bucket: env.AWS_BUCKET,
    Key: key,
  })

  await s3.send(deleteObjectCommand)
  console.log(deleteObjectCommand)

  // const makeUploadImagesUseCase = MakeUploadImagesUseCase()

  // const urlImage = env.AWS_URL_IMAGE.concat('/', fileName)

  // makeUploadImagesUseCase.execute({
  //   pet_id: id,
  //   url: urlImage,
  //   key: fileName,
  // })

  // return { ok: true }
}
