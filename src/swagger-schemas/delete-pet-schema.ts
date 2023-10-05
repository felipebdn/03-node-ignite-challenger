import { RouteShorthandOptions } from 'fastify'

export const deletePetSchema: RouteShorthandOptions = {
  schema: {
    description: 'Essa rota é responsável por remover um pet',
    summary: 'Remover pet',
    security: [{ http: [] }],
    tags: ['Pets'],
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: { type: 'string' },
      },
    },
    response: {
      200: {
        description: 'Exclusão efetuada com sucesso.',
        type: 'null',
      },
      400: {
        description: 'Pet não encontrado',
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
      401: {
        description: 'Operação não aturorizada.',
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
    },
  },
}
