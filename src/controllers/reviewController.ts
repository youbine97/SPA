import { Request, Response } from 'express'
import { reviewRepository } from '../models/Review'
import { created, ok } from '../utils/apiResponse'

export const reviewController = {
  list(_req: Request, res: Response) {
    return ok(res, reviewRepository.findAll().filter((review) => review.isPublished))
  },

  create(req: Request, res: Response) {
    return created(res, reviewRepository.create({ ...req.body, isPublished: false }))
  },
}
