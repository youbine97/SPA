import { Request, Response } from 'express'
import { blogRepository } from '../models/Blog'
import { bookingRepository } from '../models/Booking'
import { contactMessageRepository } from '../models/ContactMessage'
import { orderRepository } from '../models/Order'
import { productRepository } from '../models/Product'
import { reviewRepository } from '../models/Review'
import { serviceRepository } from '../models/Service'
import { userRepository } from '../models/User'
import { ok } from '../utils/apiResponse'

export const adminController = {
  dashboard(_req: Request, res: Response) {
    const orders = orderRepository.findAll()
    const revenue = orders.reduce((total, order) => total + order.total, 0)

    return ok(res, {
      revenue,
      users: userRepository.findAll().length,
      bookings: bookingRepository.findAll().length,
      services: serviceRepository.findAll().length,
      products: productRepository.findAll().length,
      orders: orders.length,
      reviews: reviewRepository.findAll().length,
      blogArticles: blogRepository.findAll().length,
      contactMessages: contactMessageRepository.findAll().length,
      conversionRate: 7.8,
      visitors: 24100,
    })
  },
}
