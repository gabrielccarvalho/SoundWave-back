import { FastifyReply, FastifyRequest } from 'fastify'

export function verifyPlan(planToVerify: 'free' | 'pro' | 'business') {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { plan } = request.user

    if (plan !== planToVerify) {
      return reply.status(401).send({ message: 'Unauthorized' })
    }
  }
}
