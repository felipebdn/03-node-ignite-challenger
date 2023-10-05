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
        'energy_level',
        'size',
        'age',
        'description',
        'independence',
        'environment',
      ],
      properties: {
        name: { type: 'string' },
        energy_level: { type: 'number' },
        size: { type: 'string' },
        age: { type: 'string' },
        description: { type: 'string' },
        independence: { type: 'string' },
        environment: { type: 'string' },
        requirements: { type: 'string' },
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
