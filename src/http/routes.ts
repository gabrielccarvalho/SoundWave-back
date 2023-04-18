import { FastifyInstance } from 'fastify'
import { register, authenticate } from './controllers'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)

  app.post('/sessions', authenticate)
}
