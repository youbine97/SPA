import { connectDatabase } from './config/database'
import { env } from './config/env'
import { app } from './app'

async function bootstrap() {
  await connectDatabase()

  app.listen(env.port, () => {
    console.log(`Maison Elara API running on http://127.0.0.1:${env.port}`)
  })
}

bootstrap().catch((error) => {
  console.error(error)
  process.exit(1)
})
