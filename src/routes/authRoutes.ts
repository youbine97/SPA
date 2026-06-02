import { Router } from 'express'
import { authController } from '../controllers/authController'
import { validateBody } from '../middlewares/validationMiddleware'
import { loginValidator, registerValidator } from '../validators/authValidator'

export const authRoutes = Router()

authRoutes.post('/register', validateBody(registerValidator), authController.register)
authRoutes.post('/login', validateBody(loginValidator), authController.login)
