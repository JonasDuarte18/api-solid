import type { Prisma, Gym } from 'prisma/prisma-client/browser'

export interface GymsRepository {
  findById(id: string): Promise<Gym | null>
  create(data: Prisma.GymCreateInput): Promise<Gym>
}
