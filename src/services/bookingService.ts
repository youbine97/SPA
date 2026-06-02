import { bookingRepository } from '../models/Booking'
import { serviceRepository } from '../models/Service'
import { emailService } from './emailService'

export const bookingService = {
  getAvailableSlots(date: string, specialist: string) {
    const allSlots = ['09:30', '10:45', '12:00', '14:15', '15:30', '17:00']
    const booked = bookingRepository
      .findAll()
      .filter((booking) => booking.date === date && booking.specialist === specialist && booking.status !== 'cancelled')
      .map((booking) => booking.time)

    return allSlots.filter((slot) => !booked.includes(slot))
  },

  async createBooking(input: {
    serviceId: string
    specialist: string
    date: string
    time: string
    clientName: string
    clientEmail: string
    clientPhone: string
    notes?: string
    userId?: string
  }) {
    const service = serviceRepository.findById(input.serviceId)
    if (!service) throw new Error('Service not found')

    const available = this.getAvailableSlots(input.date, input.specialist)
    if (!available.includes(input.time)) throw new Error('Selected slot is no longer available')

    const booking = bookingRepository.create({ ...input, status: 'confirmed' })
    await emailService.sendBookingConfirmation({
      to: input.clientEmail,
      clientName: input.clientName,
      serviceTitle: service.title,
      date: input.date,
      time: input.time,
    })

    return booking
  },
}
