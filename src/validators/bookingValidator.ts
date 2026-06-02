import { z } from 'zod'

export const bookingValidator = z.object({
  serviceId: z.string().min(1),
  specialist: z.string().min(2),
  date: z.string().min(8),
  time: z.string().min(4),
  clientName: z.string().min(2),
  clientEmail: z.string().email(),
  clientPhone: z.string().min(6),
  notes: z.string().optional(),
})
