import { beforeEach, describe, expect, it, vi, afterEach } from "vitest"
import { InMemoryCheckInsRepository } from "../repositories/in-memory/in-memory-check-ins-repository"
import { ValidateCheckInService } from "./validate-check-in"
import { ResourceNotFoundError } from "./errors/resource-not-found"

let checkInsRepository: InMemoryCheckInsRepository
let validateCheckInService: ValidateCheckInService

describe('Validate Check-in service', () => {
    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInsRepository()
        validateCheckInService = new ValidateCheckInService(checkInsRepository)

        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('should be able to validate the check in', async () => {
        const createdCheckIn = await checkInsRepository.create({
            gym_id: 'gym',
            user_id: 'juan',
        })

        const { checkIn } = await validateCheckInService.execute({
            checkInId: createdCheckIn.id
        })

        expect(checkIn.validated_at).toEqual(expect.any(Date))
        expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date))
    })

    it('should not be able to validate an inexistent check in', async () => {
        await expect(() => validateCheckInService.execute({
            checkInId: 'bruh'
        })).rejects.toBeInstanceOf(ResourceNotFoundError)
    })

    it('should not be able to validate the check-in after 20 minutes her creation', async () => {
        vi.setSystemTime(new Date(2023, 0, 1, 10, 30))

        const createdCheckIn = await checkInsRepository.create({
            gym_id: 'gym',
            user_id: 'juan',
        })

        const twentyOneMinutesInMilliseconds = 1000 * 60 * 21

        vi.advanceTimersByTime(twentyOneMinutesInMilliseconds)

        await expect(() => validateCheckInService.execute({
            checkInId: createdCheckIn.id
        })).rejects.toBeInstanceOf(Error)
    })
}) 