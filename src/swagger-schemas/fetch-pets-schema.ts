import { RouteShorthandOptions } from 'fastify'

export const fetchPetsSchema: RouteShorthandOptions = {
  schema: {
    description:
      'Essa rota é responsável por bustar todos os pets a partir do filtro.',
    summary: 'Buscar Pets',
    tags: ['Pets'],
    querystring: {
      type: 'object',
      required: ['state', 'city'],
      properties: {
        state: { type: 'string' },
        city: { type: 'string' },
        age: {
          type: 'string',
          description: '"cub", "adolescent" ou "elderly"',
        },
        energy_level: {
          type: 'string',
          description: 'Numero de 1 a 5.',
        },
        size: {
          type: 'string',
          description: '"small", "medium" ou "big"',
        },
        independence: {
          type: 'number',
          description: '"low", "medium" ou "high"',
        },
      },
    },
    response: {
      200: {
        description: 'Succesful response',
        type: 'object',
        properties: {
          pets: {
            type: 'array',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              energy_level: { type: 'number' },
              size: { type: 'string' },
              age: { type: 'string' },
              description: { type: 'string' },
              requirements: { type: 'string' },
              independence: { type: 'string' },
              anvironment: { type: 'string' },
              org_id: { type: 'string' },
            },
          },
        },
      },
    },
  },
}
