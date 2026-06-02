export const emailService = {
  async sendBookingConfirmation(input: { to: string; clientName: string; serviceTitle: string; date: string; time: string }) {
    console.log(`Booking confirmation queued for ${input.to}: ${input.serviceTitle} on ${input.date} at ${input.time}`)
  },

  async sendContactNotification(input: { name: string; email: string }) {
    console.log(`Contact message notification queued for ${input.name} <${input.email}>`)
  },
}
