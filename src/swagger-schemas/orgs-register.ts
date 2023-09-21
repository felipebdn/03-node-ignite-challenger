import { RouteShorthandOptions } from 'fastify'

export const orgsRegisterSchema: RouteShorthandOptions = {
  schema: {
    description: 'Essa rota é responsável por cadastrar uma nova organização',
    summary: 'Cadastrar Organização',
    tags: ['Orgs'],
    body: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        organization: { type: 'string' },
        email: { type: 'string' },
        state: {
          type: 'string',
          description: 'UF do estado com duas letras.',
        },
        city: { type: 'string' },
        cep: {
          type: 'number',
          description: 'CEP possui um numero de 8 digitos.',
        },
        number: { type: 'number', description: 'Pode ser vazio' },
        road: { type: 'string' },
        sector: { type: 'string' },
        whatsapp: { type: 'number' },
        password: { type: 'string' },
      },
    },
    response: {
      201: {
        description: 'Successful response',
        type: 'object',
      },
      409: {
        description: 'Org already exists',
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
    },
  },
}
