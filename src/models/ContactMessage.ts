import { BaseRepository, Entity } from './BaseRepository'

export type ContactMessage = Entity & {
  name: string
  email: string
  phone?: string
  message: string
  isRead: boolean
}

export const contactMessageRepository = new BaseRepository<ContactMessage>()
