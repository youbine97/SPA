import { Router } from 'express'
import { blogController } from '../controllers/blogController'
import { adminMiddleware } from '../middlewares/adminMiddleware'
import { authMiddleware } from '../middlewares/authMiddleware'

export const blogRoutes = Router()

blogRoutes.get('/', blogController.list)
blogRoutes.post('/', authMiddleware, adminMiddleware, blogController.create)
