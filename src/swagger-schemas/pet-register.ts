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
    security: [{ http: [] }],
    response: {
      201: {
        description: 'Pet registrado com sucesso.',
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
