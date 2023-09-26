import { RouteShorthandOptions } from 'fastify'

export const uploadImageSchema: RouteShorthandOptions = {
  schema: {
    description:
      'Essa rota é responsável fazer o upload das imagens os pets. Em estado de desenvolvimento.',
    summary: 'Upload das imagens',
    tags: ['Pets'],
    consumes: ['multipart/form-data'],
    security: [{ http: [] }],
  },
}
