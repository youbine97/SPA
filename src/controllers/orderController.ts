import { Request, Response } from 'express'
import { orderRepository } from '../models/Order'
import { productRepository } from '../models/Product'
import { paymentService } from '../services/paymentService'
import { created, ok } from '../utils/apiResponse'

export const orderController = {
  list(_req: Request, res: Response) {
    return ok(res, orderRepository.findAll())
  },

  async create(req: Request, res: Response) {
    const items = req.body.items.map((item: { productId: string; quantity: number }) => {
      const product = productRepository.findById(item.productId)
      return { productId: item.productId, quantity: item.quantity, unitPrice: product?.price ?? 0 }
    })
    const total = items.reduce((sum: number, item: { quantity: number; unitPrice: number }) => sum + item.quantity * item.unitPrice, 0)
    const payment = await paymentService.createPaymentIntent({ amount: total })
    return created(res, orderRepository.create({ ...req.body, items, total, status: 'pending', paymentReference: payment.reference }))
  },
}
