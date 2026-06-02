import { Request, Response } from 'express'
import { serviceRepository } from '../models/Service'
import { created, fail, ok } from '../utils/apiResponse'

export const serviceController = {
  list(_req: Request, res: Response) {
    return ok(res, serviceRepository.findAll())
  },

  create(req: Request, res: Response) {
    return created(res, serviceRepository.create({ ...req.body, isActive: req.body.isActive ?? true }))
  },

  update(req: Request, res: Response) {
    const service = serviceRepository.update(String(req.params.id), req.body)
    if (!service) return fail(res, 404, 'Service not found')
    return ok(res, service)
  },
}
