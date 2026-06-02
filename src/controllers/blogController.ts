import { Request, Response } from 'express'
import { blogRepository } from '../models/Blog'
import { created, ok } from '../utils/apiResponse'

export const blogController = {
  list(_req: Request, res: Response) {
    return ok(res, blogRepository.findAll().filter((post) => post.isPublished))
  },

  create(req: Request, res: Response) {
    return created(res, blogRepository.create({ ...req.body, isPublished: req.body.isPublished ?? false }))
  },
}
