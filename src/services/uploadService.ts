import { Request } from 'express'

export const uploadService = {
  getUploadedFileUrl(req: Request) {
    const file = req.file
    if (!file) return null
    return `/uploads/${file.filename}`
  },
}
