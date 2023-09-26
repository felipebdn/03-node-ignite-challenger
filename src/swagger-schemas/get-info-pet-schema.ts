import { RouteShorthandOptions } from 'fastify'

export const getInfoPetSchema: RouteShorthandOptions = {
  schema: {
    description: 'Essa rota é responsável mostrar as informações de um pet',
    summary: 'Bunscar Pet',
    tags: ['Pets'],
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: { type: 'string' },
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
          images: {
            type: 'array',
            properties: {
              id: { type: 'string' },
              url: { type: 'string' },
              pet_id: { type: 'string' },
            },
          },

          org: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              organization: { type: 'string' },
              road: { type: 'string' },
              number: { type: 'string' },
              sector: { type: 'string' },
              city: { type: 'string' },
              state: { type: 'string' },
              cep: { type: 'number' },
              whatsapp: { type: 'string' },
            },
          },
        },
      },
    },
  },
}
