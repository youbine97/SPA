import { BaseRepository, Entity } from './BaseRepository'

export type Review = Entity & {
  clientName: string
  rating: number
  comment: string
  serviceId?: string
  isPublished: boolean
}

export const reviewRepository = new BaseRepository<Review>()
