import { FastifyReply, FastifyRequest } from 'fastify'
import { DeleteObjectCommand } from '@aws-sdk/client-s3'
import { z } from 'zod'
import { env } from '@/env'
import { s3 } from '@/lib/s3'
import { MakeDeleteImagesUseCase } from '@/use-cases/factories/make-delete-image-use-case'
import { ImageNotFoundError } from '@/use-cases/errors/image-not-found-error'
import { OperationNotAuthorizedError } from '@/use-cases/errors/operation-not-authorized-error'

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
  } catch (err) {
    if (err instanceof ImageNotFoundError) {
      return res.status(400).send({ message: err.message })
    } else if (err instanceof OperationNotAuthorizedError) {
      return res.status(400).send({ message: err.message })
    }
  }
}
