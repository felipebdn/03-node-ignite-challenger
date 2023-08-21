import fastify from 'fastify'
import { ZodError } from 'zod'
import jwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import multipart from '@fastify/multipart'
import cors from '@fastify/cors'
import { env } from './env'
import { authRoutes } from './http/controllers/authenticated-routes/routes'
import { notAuthRoutes } from './http/controllers/not-authenticated-routes/routes'

export const app = fastify()

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
