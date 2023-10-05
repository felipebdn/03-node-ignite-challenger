import { RouteShorthandOptions } from 'fastify'

export const updatePetSchema: RouteShorthandOptions = {
  schema: {
    description: 'Essa rota é responsável por atualizar os dados sobre o pet',
    summary: 'Atualizar pet',
    tags: ['Pets'],
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: { type: 'string' },
      },
    },
    body: {
      type: 'object',
      required: [
        'name',
        'organization',
        'email',
        'state',
        'city',
        'cep',
        'road',
        'sector',
        'whatsapp',
      ],
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
      },
    },
    response: {
      201: {
        type: 'object',
        properties: {
          pet: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              energy_level: { type: 'number' },
              size: { type: 'string' },
              age: { type: 'string' },
              description: { type: 'string' },
              requirements: { type: 'string' },
              independence: { type: 'string' },
              environment: { type: 'string' },
              org_id: { type: 'string' },
            },
          },
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
