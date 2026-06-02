import { BaseRepository, Entity } from './BaseRepository'

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed'

export type Booking = Entity & {
  serviceId: string
  userId?: string
  specialist: string
  date: string
  time: string
  clientName: string
  clientEmail: string
  clientPhone: string
  notes?: string
  status: BookingStatus
}

export const bookingRepository = new BaseRepository<Booking>()
