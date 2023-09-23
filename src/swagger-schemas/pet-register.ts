import { RouteShorthandOptions } from 'fastify'

export const petRegisterSchema: RouteShorthandOptions = {
  schema: {
    description: 'Essa rota é responsável por cadastrar um novo pet',
    summary: 'Cadastrar Pet',
    tags: ['Pets'],
    body: {
      type: 'object',
      required: [
        'name',
        'energy_level',
        'size',
        'age',
        'description',
        'independence',
        'anvironment',
      ],
      properties: {
        name: { type: 'string' },
        energy_level: { type: 'number' },
        size: { type: 'string' },
        age: { type: 'string' },
        description: { type: 'string' },
        independence: { type: 'string' },
        anvironment: { type: 'string' },
        requirements: { type: 'string' },
      },
    },
    security: [{ apiKey: [] }],
    response: {
      201: {
        description: 'Pet registrado com sucesso.',
        type: 'null',
      },
      401: {
        description: 'Unauthorized',
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
      409: {
        description: 'Pet already exists',
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
    },
  },
}
