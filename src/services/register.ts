import { hash } from 'bcryptjs'
import { usersRepository } from '@/repositories/users-repository'

interface iRegisterService {
  name: string
  email: string
  plan?: string
  password: string
}

export class RegisterService {
  constructor(private usersRepository: usersRepository) {}

  async execute({ name, email, plan, password }: iRegisterService) {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new Error('E-mail already exists')
    }

    await this.usersRepository.create({
      name,
      email,
      plan,
      password_hash,
    })
  }
}
