import dotenv from 'dotenv'

dotenv.config()

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 4000),
  jwtSecret: process.env.JWT_SECRET ?? 'change-me-in-production',
  clientUrl: process.env.CLIENT_URL ?? 'http://127.0.0.1:5173',
  databaseUrl: process.env.DATABASE_URL ?? 'memory://local',
}
