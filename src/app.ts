import { fastify } from 'fastify'
import { appRoutes } from './http/routes.js'
import { z, ZodError } from 'zod'
import { env } from './env/index.js'

export const app = fastify()

app.register(appRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: z.treeifyError(error) })
  }

  if (env.NODE_ENV !== 'PROD') {
    console.error(error)
  } else {
    // TODO: Here we should log to an external tool like Datadog, New Relic, Sentry, etc.
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
