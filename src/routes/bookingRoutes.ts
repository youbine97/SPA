import { Router } from 'express'
import { bookingController } from '../controllers/bookingController'
import { adminMiddleware } from '../middlewares/adminMiddleware'
import { authMiddleware } from '../middlewares/authMiddleware'
import { validateBody } from '../middlewares/validationMiddleware'
import { bookingValidator } from '../validators/bookingValidator'

export const bookingRoutes = Router()

bookingRoutes.get('/slots', bookingController.slots)
bookingRoutes.get('/', authMiddleware, adminMiddleware, bookingController.list)
bookingRoutes.post('/', validateBody(bookingValidator), bookingController.create)
