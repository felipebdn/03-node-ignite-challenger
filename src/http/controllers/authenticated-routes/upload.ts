import { randomUUID } from 'crypto'
import { FastifyReply, FastifyRequest } from 'fastify'
import { createWriteStream } from 'fs'
import { extname, resolve } from 'path'
import { pipeline } from 'stream'
import { promisify } from 'util'

const pump = promisify(pipeline)

export async function uploadRoute(req: FastifyRequest, res: FastifyReply) {
  const upload = await req.file({
    limits: {
      fieldSize: 5_242_880, // 5MB
    },
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

  const writeStream = createWriteStream(
    resolve(__dirname, '../../../../uploads', fileName),
  )

  await pump(upload.file, writeStream)

  return { ok: true }
}
