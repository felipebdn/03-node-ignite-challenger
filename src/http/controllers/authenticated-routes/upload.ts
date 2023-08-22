import { s3 } from '@/lib/s3'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { randomUUID } from 'crypto'
import { FastifyReply, FastifyRequest } from 'fastify'
import { extname } from 'path'
import { env } from 'process'

export async function uploadRoute(req: FastifyRequest, res: FastifyReply) {
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

  return { ok: true }
}
