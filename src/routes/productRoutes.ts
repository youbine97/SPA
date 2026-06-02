import { Router } from 'express'
import { productController } from '../controllers/productController'
import { adminMiddleware } from '../middlewares/adminMiddleware'
import { authMiddleware } from '../middlewares/authMiddleware'
import { uploadMiddleware } from '../middlewares/uploadMiddleware'

export const productRoutes = Router()

productRoutes.get('/', productController.list)
productRoutes.post('/', authMiddleware, adminMiddleware, uploadMiddleware.single('image'), productController.create)
productRoutes.put('/:id', authMiddleware, adminMiddleware, productController.update)
