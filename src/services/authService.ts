import { userRepository } from '../models/User'
import { comparePassword, hashPassword } from '../utils/hashPassword'
import { generateToken } from '../utils/generateToken'

function publicUser(user: NonNullable<ReturnType<typeof userRepository.findById>>) {
  const { passwordHash, ...safeUser } = user
  return safeUser
}

export const authService = {
  async register(input: { name: string; email: string; password: string }) {
    const existing = userRepository.findByEmail(input.email)
    if (existing) throw new Error('Email is already registered')

    const passwordHash = await hashPassword(input.password)
    const user = userRepository.create({ name: input.name, email: input.email, passwordHash, role: 'client' })
    return { user: publicUser(user), token: generateToken(user) }
  },

  async login(input: { email: string; password: string }) {
    const user = userRepository.findByEmail(input.email)
    if (!user) throw new Error('Invalid credentials')

    const valid = await comparePassword(input.password, user.passwordHash)
    if (!valid) throw new Error('Invalid credentials')

    return { user: publicUser(user), token: generateToken(user) }
  },
}
