import jwt from 'jsonwebtoken'
import { env } from '../config/env'
import { UserRole } from '../models/User'

export type TokenPayload = {
  id: string
  email: string
  role: UserRole
}

export function generateToken(payload: TokenPayload) {
  return jwt.sign(payload, env.jwtSecret, { expiresIn: '7d' })
}
