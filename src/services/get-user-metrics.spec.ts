import { beforeEach, describe, expect, it } from "vitest"
import { InMemoryCheckInsRepository } from "../repositories/in-memory/in-memory-check-ins-repository"
import { GetUserMetricsService } from "./get-user-metrics"

let checkInsRepository: InMemoryCheckInsRepository
let getUserMetricsService: GetUserMetricsService

describe('Get User Metrics Service', () => {
    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInsRepository()
        getUserMetricsService = new GetUserMetricsService(checkInsRepository)
    })

    it('should be able to count the total of check-ins', async () => {
        await checkInsRepository.create({
            gym_id: 'gym',
            user_id: 'juan',
        })

        await checkInsRepository.create({
            gym_id: 'gym2',
            user_id: 'juan',
        })

        const { checkInsCount } = await getUserMetricsService.execute({
            userId: 'juan',
        })


        expect(checkInsCount).toEqual(2)
    })
})