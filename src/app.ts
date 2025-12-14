import { fastify } from 'fastify'
import { routes } from './http/routes.js'

export const app = fastify()

app.register(routes)
