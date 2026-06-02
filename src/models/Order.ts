import { BaseRepository, Entity } from './BaseRepository'

export type OrderStatus = 'pending' | 'paid' | 'fulfilled' | 'cancelled'

export type OrderItem = {
  productId: string
  quantity: number
  unitPrice: number
}

export type Order = Entity & {
  clientName: string
  clientEmail: string
  items: OrderItem[]
  total: number
  status: OrderStatus
  paymentReference?: string
}

export const orderRepository = new BaseRepository<Order>()
