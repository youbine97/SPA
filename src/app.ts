import cors from 'cors'
import express from 'express'
import path from 'path'
import { adminRoutes } from './routes/adminRoutes'
import { authRoutes } from './routes/authRoutes'
import { blogRoutes } from './routes/blogRoutes'
import { bookingRoutes } from './routes/bookingRoutes'
import { contactRoutes } from './routes/contactRoutes'
import { orderRoutes } from './routes/orderRoutes'
import { productRoutes } from './routes/productRoutes'
import { reviewRoutes } from './routes/reviewRoutes'
import { serviceRoutes } from './routes/serviceRoutes'
import { userRoutes } from './routes/userRoutes'
import { errorMiddleware } from './middlewares/errorMiddleware'
import { env } from './config/env'
import { serviceRepository } from './models/Service'
import { productRepository } from './models/Product'

export const app = express()

app.use(cors({ origin: env.clientUrl, credentials: true }))
app.use(express.json())
app.use('/uploads', express.static(path.resolve('src/public/uploads')))

app.get('/api/health', (_req, res) => {
  res.json({ success: true, message: 'Maison Elara API is healthy' })
})

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/services', serviceRoutes)
app.use('/api/bookings', bookingRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/reviews', reviewRoutes)
app.use('/api/blog', blogRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/admin', adminRoutes)

seedCatalog()

app.use(errorMiddleware)

function seedCatalog() {
  if (serviceRepository.findAll().length === 0) {
    serviceRepository.create({
      title: 'Signature Hydrafacial',
      category: 'face',
      description: 'Deep cleansing, exfoliation, extraction, and infusion for luminous skin.',
      benefits: ['Immediate glow', 'Refined pores', 'Hydration boost'],
      durationMinutes: 60,
      price: 190,
      imageUrl: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c',
      isActive: true,
    })
    serviceRepository.create({
      title: 'Cryolipolysis Contour',
      category: 'body',
      description: 'Non-invasive cooling treatment for targeted body contouring.',
      benefits: ['No downtime', 'Targeted sculpting', 'Comfort protocol'],
      durationMinutes: 80,
      price: 390,
      imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874',
      isActive: true,
    })
  }

  if (productRepository.findAll().length === 0) {
    productRepository.create({
      name: 'Rose Quartz Recovery Serum',
      category: 'Skincare',
      description: 'A polished recovery serum for post-treatment radiance.',
      price: 88,
      stock: 24,
      imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be',
      isActive: true,
    })
  }
}
