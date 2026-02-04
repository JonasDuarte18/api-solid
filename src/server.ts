import chalk from 'chalk'
import { app } from './app.js'
import { env } from './env/index.js'

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => {
    console.clear()
    console.log(
      `🚀 HTTP server running! ${chalk.blue('http://localhost:3333')}`,
    )
  })
