import type { CheckInsRepository } from '../check-ins-repository'
import type { CheckIn, Prisma } from 'prisma/prisma-client/browser'
import { randomUUID } from 'node:crypto'

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckIn[] = []

  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn = {
      id: randomUUID(),
      createdAt: new Date(),
      userId: data.userId,
      gymId: data.gymId,
      validatedAt: data.validatedAt ? new Date(data.validatedAt) : null,
      updatedAt: new Date(),
    }

    this.items.push(checkIn)

    return checkIn
  }
}
