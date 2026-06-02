import { Request, Response } from 'express'
import { contactMessageRepository } from '../models/ContactMessage'
import { emailService } from '../services/emailService'
import { created } from '../utils/apiResponse'

export const contactController = {
  async create(req: Request, res: Response) {
    const message = contactMessageRepository.create({ ...req.body, isRead: false })
    await emailService.sendContactNotification(req.body)
    return created(res, message, 'Message received')
  },
}
