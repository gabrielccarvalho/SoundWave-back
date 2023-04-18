import { hash } from 'bcryptjs'
import { usersRepository } from '@/repositories/users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface iRegisterUseCase {
  name: string
  email: string
  plan?: string
  password: string
}

export class RegisterUseCase {
  constructor(private usersRepository: usersRepository) {}

  async execute({ name, email, plan, password }: iRegisterUseCase) {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    await this.usersRepository.create({
      name,
      email,
      plan,
      password_hash,
    })
  }
}
