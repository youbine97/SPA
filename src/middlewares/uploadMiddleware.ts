import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
  destination: 'src/public/uploads',
  filename: (_req, file, callback) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
    callback(null, `${unique}${path.extname(file.originalname)}`)
  },
})

export const uploadMiddleware = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
})
