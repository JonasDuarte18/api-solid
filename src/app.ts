import { fastify } from 'fastify'
import { prisma } from './lib/prisma.js'

export const app = fastify()

prisma.user.create({
  data: {
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: '123456',
  },
})
