import { env } from '@/env/index.js'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from 'prisma/prisma-client/client.js'

const adapter = new PrismaPg({ connectionString: env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

export { prisma }
