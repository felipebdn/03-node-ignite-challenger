import { FastifyReply, FastifyRequest } from 'fastify'
import { DeleteObjectCommand } from '@aws-sdk/client-s3'
import { z } from 'zod'
import { env } from '@/env'
import { s3 } from '@/lib/s3'
import { MakeDeleteImagesUseCase } from '@/use-cases/factories/make-delete-image-use-case'

export async function deleteImageRoute(req: FastifyRequest, res: FastifyReply) {
  const UploadRouteParamsSchema = z.object({
    key: z.string(),
  })

  const { key } = UploadRouteParamsSchema.parse(req.params)

  const deleteObjectCommand = new DeleteObjectCommand({
    Bucket: env.AWS_BUCKET,
    Key: key,
  })

  const makeDeleteImagesUseCase = MakeDeleteImagesUseCase()

  try {
    makeDeleteImagesUseCase.execute(key, req.user.sub)
    await s3.send(deleteObjectCommand)
    return res.status(200).send()
  } catch (error) {
    return res.status(400).send()
  }
}
