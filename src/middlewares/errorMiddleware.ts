import { NextFunction, Request, Response } from 'express'
import { fail } from '../utils/apiResponse'

export function errorMiddleware(error: Error, _req: Request, res: Response, _next: NextFunction) {
  return fail(res, 500, error.message || 'Internal server error')
}
