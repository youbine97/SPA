import { Router } from 'express'
import { orderController } from '../controllers/orderController'
import { adminMiddleware } from '../middlewares/adminMiddleware'
import { authMiddleware } from '../middlewares/authMiddleware'

export const orderRoutes = Router()

orderRoutes.get('/', authMiddleware, adminMiddleware, orderController.list)
orderRoutes.post('/', orderController.create)
