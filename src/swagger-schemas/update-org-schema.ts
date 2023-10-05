import { RouteShorthandOptions } from 'fastify'

export const updateOrgchema: RouteShorthandOptions = {
  schema: {
    description:
      'Essa rota é responsável por atualizar os dados de uma organização.',
    summary: 'Atualizar organização',
    security: [{ http: [] }],
    tags: ['Orgs'],
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
              email: { type: 'string' },
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
      409: {
        description: 'Email ou numero de telefone ja em uso',
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
    },
  },
}
