import { env } from '@/env/index'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from 'prisma/prisma-client/client'

const adapter = new PrismaPg({ connectionString: env.DATABASE_URL })
const prisma = new PrismaClient({
  adapter,
  log: env.NODE_ENV === 'DEV' ? ['query'] : [],
})

export { prisma }
