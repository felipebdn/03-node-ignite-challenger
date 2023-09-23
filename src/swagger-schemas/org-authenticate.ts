import { RouteShorthandOptions } from 'fastify'

export const orgAuthenticateSchema: RouteShorthandOptions = {
  schema: {
    description:
      'Essa rota é responsável por fazer a autenticação da organização',
    summary: 'Autenticar Organização',
    tags: ['Orgs'],
    body: {
      type: 'object',
      required: ['email', 'password'],
      properties: {
        email: { type: 'string' },
        password: { type: 'string' },
      },
    },
    response: {
      200: {
        description:
          'Autenticação efetuada com sucesso, use o token para usar as rotas de upload e cadastro do pet',
        type: 'object',
        properties: {
          token: { type: 'string' },
        },
      },
      400: {
        description: 'Credenciais inválidas',
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
    },
  },
}
