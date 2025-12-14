import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

interface RegisterUseCaseProps {
  name: string
  email: string
  password: string
}

export async function registerUseCase({
  name,
  email,
  password,
}: RegisterUseCaseProps) {
  const passwordHash = await hash(password, 6)

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userWithSameEmail) {
    throw new Error('User with same email already exists')
  }

  await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
    },
  })
}
