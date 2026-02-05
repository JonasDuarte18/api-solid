import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/index-browser'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check-In Use Case', () => {
  // Cria os repositorios antes de CADA teste
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    gymsRepository.items.push({
      id: 'gym-1',
      title: 'Gym 1',
      description: 'Gym 1 description',
      phone: 'Gym 1 phone',
      latitude: new Decimal(7.2387229),
      longitude: new Decimal(-39.3245697),
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      userId: 'user-1',
      gymId: 'gym-1',
      userLatitude: 7.2387229,
      userLongitude: -39.3245697,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2026, 0, 20, 8, 0, 0))

    await sut.execute({
      userId: 'user-1',
      gymId: 'gym-1',
      userLatitude: 7.2387229,
      userLongitude: -39.3245697,
    })

    await expect(() =>
      sut.execute({
        userId: 'user-1',
        gymId: 'gym-1',
        userLatitude: 7.2387229,
        userLongitude: -39.3245697,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2026, 0, 20, 8, 0, 0))

    await sut.execute({
      userId: 'user-1',
      gymId: 'gym-1',
      userLatitude: 7.2387229,
      userLongitude: -39.3245697,
    })

    vi.setSystemTime(new Date(2026, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      userId: 'user-1',
      gymId: 'gym-1',
      userLatitude: 7.2387229,
      userLongitude: -39.3245697,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym', async () => {
    gymsRepository.items.push({
      id: 'gym-2',
      title: 'Gym 1',
      description: 'Gym 1 description',
      phone: 'Gym 1 phone',
      latitude: new Decimal(-7.2059403),
      longitude: new Decimal(-39.3202996),
    })

    await expect(() =>
      sut.execute({
        userId: 'user-1',
        gymId: 'gym-2',
        userLatitude: -7.2387229,
        userLongitude: -39.3245697,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
