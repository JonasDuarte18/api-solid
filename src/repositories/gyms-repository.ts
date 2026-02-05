import type { Gym } from 'prisma/prisma-client/client'

export interface GymsRepository {
  findById(id: string): Promise<Gym | null>
}
