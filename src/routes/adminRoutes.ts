import { Router } from 'express'
import { adminController } from '../controllers/adminController'
import { adminMiddleware } from '../middlewares/adminMiddleware'
import { authMiddleware } from '../middlewares/authMiddleware'

export const adminRoutes = Router()

adminRoutes.get('/dashboard', authMiddleware, adminMiddleware, adminController.dashboard)
