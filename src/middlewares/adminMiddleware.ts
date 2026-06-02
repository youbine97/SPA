import { NextFunction, Request, Response } from 'express'
import { fail } from '../utils/apiResponse'

export function adminMiddleware(req: Request, res: Response, next: NextFunction) {
  if (req.user?.role !== 'admin') return fail(res, 403, 'Admin access required')
  return next()
}
