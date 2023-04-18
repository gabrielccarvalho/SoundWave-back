import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { RegisterService } from '@/services/register'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    plan: z.string().optional(),
  })

  const { name, email, plan, password } = registerBodySchema.parse(request.body)

  try {
    const usersRepository = new PrismaUsersRepository() // If want to change the dependency, just change this line

    const registerService = new RegisterService(usersRepository)

    await registerService.execute({ name, email, plan, password })
  } catch (err) {
    return reply.status(409).send()
  }

  return reply.status(201).send()
}
