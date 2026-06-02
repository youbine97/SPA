import { z } from 'zod'

export const productValidator = z.object({
  name: z.string().min(2),
  category: z.string().min(2),
  description: z.string().min(10),
  price: z.number().positive(),
  stock: z.number().int().min(0),
  imageUrl: z.string().url().optional(),
  isActive: z.boolean().optional(),
})
