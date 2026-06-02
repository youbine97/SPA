import { BaseRepository, Entity } from './BaseRepository'

export type Service = Entity & {
  title: string
  category: 'face' | 'body' | 'aesthetic'
  description: string
  benefits: string[]
  durationMinutes: number
  price: number
  imageUrl?: string
  isActive: boolean
}

export const serviceRepository = new BaseRepository<Service>()
