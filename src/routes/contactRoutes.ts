import { Router } from 'express'
import { contactController } from '../controllers/contactController'
import { validateBody } from '../middlewares/validationMiddleware'
import { contactValidator } from '../validators/contactValidator'

export const contactRoutes = Router()

contactRoutes.post('/', validateBody(contactValidator), contactController.create)
