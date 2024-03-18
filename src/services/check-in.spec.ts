import { beforeEach, describe, expect, it, vi, afterEach } from "vitest"
import { InMemoryCheckInsRepository } from "../repositories/in-memory/in-memory-check-ins-repository"
import { CheckInService } from "./check-in"
import { InMemoryGymsRepository } from "../repositories/in-memory/in-memory-gyms-repository"
import { Decimal } from "@prisma/client/runtime/library"
import { MaxNumberOfCheckInsError } from "./errors/max-number-of-check-ins-error"
import { MaxDistanceError } from "./errors/max-distance-error"

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let checkInService: CheckInService

describe('Check-in service', () => {
    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInsRepository()
        gymsRepository = new InMemoryGymsRepository()
        checkInService = new CheckInService(checkInsRepository, gymsRepository)

        await gymsRepository.create({
            id: 'gyn',
            title: "bruh2",
            description: "bruh2",
            phone: '',
            latitude: 0,
            longitude: 0
        })

        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('should be able to check in', async () => {
        const { checkIn } = await checkInService.execute({
            gymId: 'gyn',
            userId: 'juan',
            userLatitude: 0,
            userLongitude: 0,
        })


        expect(checkIn.id).toEqual(expect.any(String))
    })

    it('should not be able to check in twice in the same day', async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

        await checkInService.execute({
            gymId: 'gyn',
            userId: 'juan',
            userLatitude: 0,
            userLongitude: 0
        })


        await expect(() => checkInService.execute({
            gymId: 'gyn',
            userId: 'juan',
            userLatitude: 0,
            userLongitude: 0
        })).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
    })

    it('should be able to check in twice, but in different days', async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

        await checkInService.execute({
            gymId: 'gyn',
            userId: 'juan',
            userLatitude: 0,
            userLongitude: 0
        })

        vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

        const { checkIn } = await checkInService.execute({
            gymId: 'gyn',
            userId: 'juan',
            userLatitude: 0,
            userLongitude: 0
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

    it('should not be able to check in on distant gym', async () => {

        gymsRepository.items.push({
            id: 'gyn2',
            title: "bruh2",
            description: "bruh2",
            phone: '',
            latitude: new Decimal(110),
            longitude: new Decimal(110)
        })

        await expect(() => checkInService.execute({
            gymId: 'gyn2' ,
            userId: 'juan',
            userLatitude: 0,
            userLongitude: 0
        })).rejects.toBeInstanceOf(MaxDistanceError)
    })
}) 