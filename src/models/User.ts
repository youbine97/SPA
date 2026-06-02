import { BaseRepository, Entity } from './BaseRepository'

export type UserRole = 'client' | 'admin'

export type User = Entity & {
  name: string
  email: string
  passwordHash: string
  role: UserRole
}

class UserRepository extends BaseRepository<User> {
  findByEmail(email: string) {
    return this.findAll().find((user) => user.email.toLowerCase() === email.toLowerCase()) ?? null
  }
}

export const userRepository = new UserRepository()
