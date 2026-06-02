import { NextFunction, Request, Response } from 'express'
import { ZodSchema } from 'zod'
import { fail } from '../utils/apiResponse'

export function validateBody(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const parsed = schema.safeParse(req.body)
    if (!parsed.success) return fail(res, 422, 'Validation failed', parsed.error.flatten())

    req.body = parsed.data
    return next()
  }
}
