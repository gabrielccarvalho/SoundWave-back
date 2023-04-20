import '@fastify/jwt'

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    user: {
      sub: string
      plan: 'free' | 'pro' | 'business'
    }
  }
}
