import { Router } from 'express'
import { reviewController } from '../controllers/reviewController'

export const reviewRoutes = Router()

reviewRoutes.get('/', reviewController.list)
reviewRoutes.post('/', reviewController.create)
