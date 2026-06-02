import { Request, Response } from 'express'
import { userRepository } from '../models/User'
import { ok } from '../utils/apiResponse'

export const userController = {
  list(_req: Request, res: Response) {
    const users = userRepository.findAll().map(({ passwordHash, ...user }) => user)
    return ok(res, users)
  },
}
