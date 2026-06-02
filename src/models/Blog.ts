import { BaseRepository, Entity } from './BaseRepository'

export type Blog = Entity & {
  title: string
  slug: string
  category: string
  excerpt: string
  content: string
  coverImageUrl?: string
  isPublished: boolean
}

export const blogRepository = new BaseRepository<Blog>()
