'use strict'
import fastify from 'fastify'
import { ZodError } from 'zod'
import jwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import Swagger from '@fastify/swagger'
import SwaggerUI from '@fastify/swagger-ui'
import multipart from '@fastify/multipart'
import cors from '@fastify/cors'
import { authRoutes } from './http/controllers/authenticated-routes/routes'
import { notAuthRoutes } from './http/controllers/not-authenticated-routes/routes'
import { env } from './env'
import { validatorCompiler } from './lib/validador-compiler'

export const app = fastify()

app.setValidatorCompiler(validatorCompiler)

app.register(Swagger, {
  openapi: {
    info: {
      title: 'Find a Friend API',
      version: '0.1.0',
      termsOfService: '/terms',
      contact: {
        email: 'dfelipebdn@gmail.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3333',
        description: 'API de teste',
      },
      {
        url: 'https://node-ignite-chellenger-03.onrender.com',
        description: 'API de produção',
      },
    ],
    components: {
      securitySchemes: {
        http: {
          type: 'http',
          description: 'Use o JWT que pode ser obtido no na rota /authenticate',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    externalDocs: {
      description: 'Find more info here',
      url: 'https://swagger.io',
    },
  },
})

app.register(SwaggerUI, {
  routePrefix: '/docs',
})

app.get('/terms', () => {
  return JSON.stringify({
    message: 'termos e serviços',
  })
})

app.register(multipart)

app.register(cors, {
  origin: true, // ['http://localhost:3000']
})

app.register(jwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

app.register(fastifyCookie)

app.register(notAuthRoutes)
app.register(authRoutes)

app.setErrorHandler((error, _req, res) => {
  if (error instanceof ZodError) {
    return res
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }
  if (env.NODE_ENV !== 'production') {
    console.log(error)
  }
  return res.status(500).send({ message: 'Internal server error.' })
})
