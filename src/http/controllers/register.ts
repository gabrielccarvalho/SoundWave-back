import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { RegisterUseCase } from '@/use-cases/register'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'

export default async function register(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    plan: z.string().optional(),
  })

  const { name, email, plan, password } = registerBodySchema.parse(request.body)

  try {
    const usersRepository = new PrismaUsersRepository() // If want to change the dependency, just change this line

    const registerUseCase = new RegisterUseCase(usersRepository)

    await registerUseCase.execute({ name, email, plan, password })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
