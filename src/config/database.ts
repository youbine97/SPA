import { env } from './env'

export async function connectDatabase() {
  if (env.databaseUrl.startsWith('memory://')) {
    console.log('Database connected: in-memory repository store')
    return
  }

  console.log(`Database configured: ${env.databaseUrl}`)
}
