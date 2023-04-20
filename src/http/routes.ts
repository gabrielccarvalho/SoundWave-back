import { FastifyInstance } from 'fastify'
import { register, authenticate, profile } from './controllers'
import { verifyJWT } from './middlewares/verify-jwt'
import refresh from './controllers/refresh'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)

  app.post('/sessions', authenticate)

  app.patch('/token/refresh', refresh)

  // Protected Routes
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
