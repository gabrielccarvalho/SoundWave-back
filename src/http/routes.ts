import { FastifyInstance } from 'fastify'
import { register, authenticate, profile } from './controllers'
import { verifyJWT } from './middlewares/verify-jwt'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)

  app.post('/sessions', authenticate)

  // Protected Routes
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
