import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { env } from '../config/env'
import { TokenPayload } from '../utils/generateToken'
import { fail } from '../utils/apiResponse'

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload
    }
  }
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.replace('Bearer ', '')
  if (!token) return fail(res, 401, 'Authentication required')

  try {
    req.user = jwt.verify(token, env.jwtSecret) as TokenPayload
    return next()
  } catch {
    return fail(res, 401, 'Invalid or expired token')
  }
}
