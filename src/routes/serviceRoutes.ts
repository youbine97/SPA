import { Router } from 'express'
import { serviceController } from '../controllers/serviceController'
import { adminMiddleware } from '../middlewares/adminMiddleware'
import { authMiddleware } from '../middlewares/authMiddleware'

export const serviceRoutes = Router()

serviceRoutes.get('/', serviceController.list)
serviceRoutes.post('/', authMiddleware, adminMiddleware, serviceController.create)
serviceRoutes.put('/:id', authMiddleware, adminMiddleware, serviceController.update)
