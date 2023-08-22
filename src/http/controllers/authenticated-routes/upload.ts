import { env } from '@/env'
import { s3 } from '@/lib/s3'
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

  const mimeTypeRegex = /^(image|video)\/[a-zA-Z]+/
  const isValidFileFormat = mimeTypeRegex.test(upload.mimetype)

  if (!isValidFileFormat) {
    return res.status(400).send()
  }

  const fileId = randomUUID()
  const extension = extname(upload.filename)

  const fileName = fileId.concat(extension)

  const putObjectCommand = new PutObjectCommand({
    Bucket: env.AWS_BUCKET,
    Key: fileName,
    Body: await upload.toBuffer(),
    ContentType: upload.mimetype,
    ACL: 'public-read',
  })

  await s3.send(putObjectCommand)

  const makeUploadImagesUseCase = MakeUploadImagesUseCase()

  const urlImage = env.AWS_URL_IMAGE.concat('/', fileName)

  console.log(urlImage)

  makeUploadImagesUseCase.execute({
    petId: id,
    url: [urlImage],
  })

  return { ok: true }
}
