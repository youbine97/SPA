import { Router } from 'express'
import { userController } from '../controllers/userController'
import { adminMiddleware } from '../middlewares/adminMiddleware'
import { authMiddleware } from '../middlewares/authMiddleware'

export const userRoutes = Router()

userRoutes.get('/', authMiddleware, adminMiddleware, userController.list)
