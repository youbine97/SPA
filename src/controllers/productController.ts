import { Request, Response } from 'express'
import { productRepository } from '../models/Product'
import { uploadService } from '../services/uploadService'
import { created, fail, ok } from '../utils/apiResponse'

export const productController = {
  list(_req: Request, res: Response) {
    return ok(res, productRepository.findAll())
  },

  create(req: Request, res: Response) {
    const imageUrl = uploadService.getUploadedFileUrl(req) ?? req.body.imageUrl
    return created(res, productRepository.create({ ...req.body, imageUrl, isActive: req.body.isActive ?? true }))
  },

  update(req: Request, res: Response) {
    const product = productRepository.update(String(req.params.id), req.body)
    if (!product) return fail(res, 404, 'Product not found')
    return ok(res, product)
  },
}
