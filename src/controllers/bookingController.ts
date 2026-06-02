import { Request, Response } from 'express'
import { bookingRepository } from '../models/Booking'
import { bookingService } from '../services/bookingService'
import { created, fail, ok } from '../utils/apiResponse'

export const bookingController = {
  list(_req: Request, res: Response) {
    return ok(res, bookingRepository.findAll())
  },

  slots(req: Request, res: Response) {
    return ok(res, bookingService.getAvailableSlots(String(req.query.date), String(req.query.specialist)))
  },

  async create(req: Request, res: Response) {
    try {
      return created(res, await bookingService.createBooking({ ...req.body, userId: req.user?.id }), 'Booking confirmed')
    } catch (error) {
      return fail(res, 400, (error as Error).message)
    }
  },
}
