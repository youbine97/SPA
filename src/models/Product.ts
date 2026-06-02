import { BaseRepository, Entity } from './BaseRepository'

export type Product = Entity & {
  name: string
  category: string
  description: string
  price: number
  stock: number
  imageUrl?: string
  isActive: boolean
}

export const productRepository = new BaseRepository<Product>()
