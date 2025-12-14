import { prisma } from '@/lib/prisma'
import { type Prisma } from 'prisma/prisma-client/client'

export class PrismaUsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }
}
