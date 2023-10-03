import { env } from '@/env'
import { s3 } from '@/lib/s3'
import { OperationNotAuthorizedError } from '@/use-cases/errors/operation-not-authorized-error'
import { PetNotFoundError } from '@/use-cases/errors/pet-not-found'
import { MakeUploadImagesUseCase } from '@/use-cases/factories/make-upload-images-use-case'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { randomUUID } from 'crypto'
import { FastifyReply, FastifyRequest } from 'fastify'
import { extname } from 'path'
import { z } from 'zod'

export async function uploadRoute(req: FastifyRequest, res: FastifyReply) {
  const UploadRouteParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = UploadRouteParamsSchema.parse(req.params)

  const upload = await req.file({
    limits: { fileSize: 5_242_880 },
  })

  if (!upload) {
    return res.status(400).send()
  }

  try {
    await upload.toBuffer()
  } catch (err) {
    return res.status(400).send({
      message: 'Exceeded size limit',
    })
  }

  const mimeTypeRegex = /^(image|video)\/[a-zA-Z]+/
  const isValidFileFormat = mimeTypeRegex.test(upload.mimetype)

  if (!isValidFileFormat) {
    return res.status(400).send({
      message: 'Format invalid',
    })
  }

  const fileId = randomUUID()
  const extension = extname(upload.filename)

  const fileName = fileId.concat(extension)

  const putObjectCommand = new PutObjectCommand({
    Bucket: env.AWS_BUCKET,
    Key: fileName,
    Body: await upload.toBuffer(),
    ContentType: upload.mimetype,
    ACL: 'public-read-write', // verificar -> bucket-owner-full-control
  })

  const urlImage = env.AWS_URL_IMAGE.concat('/', fileName)
  const makeUploadImagesUseCase = MakeUploadImagesUseCase()

  try {
    const { image } = await makeUploadImagesUseCase.execute({
      pet_id: id,
      url: urlImage,
      key: fileName,
      org_id: req.user.sub,
    })
    await s3.send(putObjectCommand)

    return res.status(200).send(image)
  } catch (err) {
    if (err instanceof OperationNotAuthorizedError) {
      return res.status(400).send({ message: err.message })
    } else if (err instanceof PetNotFoundError) {
      return res.status(400).send({ message: err.message })
    }
  }
}
