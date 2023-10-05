import { RouteShorthandOptions } from 'fastify'

export const getInfoOrgSchema: RouteShorthandOptions = {
  schema: {
    description: 'Essa rota é responsável por cadastrar uma nova organização',
    summary: 'Cadastrar Organização',
    tags: ['Orgs'],
    params: {
      type: 'object',
      properties: {
        id: { type: 'string' },
      },
    },
    response: {
      201: {
        description: 'Organização registrada com sucesso',
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          organization: { type: 'string' },
          email: { type: 'string' },
          road: { type: 'string' },
          number: { type: 'string' },
          sector: { type: 'string' },
          city: { type: 'string' },
          state: { type: 'string' },
          cep: { type: 'number' },
          whatsapp: { type: 'string' },
        },
      },
      400: {
        description: 'Org not found.',
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
    },
  },
}
