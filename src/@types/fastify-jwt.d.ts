import '@fastify/jwt'

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    payload: {
      road: string
      number?: string
      sector: string
      city: string
      uf: string
      name: string
    }
    user: {
      sub: string
    }
  }
}
