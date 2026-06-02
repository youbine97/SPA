import { Request, Response } from 'express'
import { authService } from '../services/authService'
import { created, fail, ok } from '../utils/apiResponse'

export const authController = {
  async register(req: Request, res: Response) {
    try {
      return created(res, await authService.register(req.body), 'Account created')
    } catch (error) {
      return fail(res, 400, (error as Error).message)
    }
  },

  async login(req: Request, res: Response) {
    try {
      return ok(res, await authService.login(req.body), 'Logged in')
    } catch (error) {
      return fail(res, 401, (error as Error).message)
    }
  },
}
