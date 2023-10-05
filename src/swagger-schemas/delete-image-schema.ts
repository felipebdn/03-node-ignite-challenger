import { RouteShorthandOptions } from 'fastify'

export const deleteImage: RouteShorthandOptions = {
  schema: {
    description:
      'Essa rota é responsável por deletar uma imagem especifica de um Pet',
    summary: 'Deletar imagem',
    tags: ['Pets'],
    params: {
      type: 'object',
      required: ['key'],
      properties: {
        key: { type: 'string' },
      },
    },
    security: [{ http: [] }],
    response: {
      200: {
        description: 'Exclusão efetuada com sucesso.',
        type: 'null',
      },
      401: {
        description: 'Unauthorized',
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
      400: {
        description: 'Pet already exists',
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
    },
  },
}
