import { randomUUID } from 'crypto'

export const paymentService = {
  async createPaymentIntent(input: { amount: number; currency?: string }) {
    return {
      reference: `pay_${randomUUID()}`,
      amount: input.amount,
      currency: input.currency ?? 'USD',
      status: 'requires_payment_method',
    }
  },
}
