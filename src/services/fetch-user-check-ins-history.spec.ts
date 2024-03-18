import { beforeEach, describe, expect, it } from "vitest"
import { InMemoryCheckInsRepository } from "../repositories/in-memory/in-memory-check-ins-repository"
import { FetchUserCheckInsHistoryService } from "./fetch-user-check-ins-history"

let checkInsRepository: InMemoryCheckInsRepository
let fetchUserCheckInsHistoryService: FetchUserCheckInsHistoryService

describe('Search gyms by title', () => {
    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInsRepository()
        fetchUserCheckInsHistoryService = new FetchUserCheckInsHistoryService(checkInsRepository)
    })

    it('should be able to fetch check-in history', async () => {
        await checkInsRepository.create({
            gym_id: 'gym',
            user_id: 'juan',
        })

        await checkInsRepository.create({
            gym_id: 'gym2',
            user_id: 'juan',
        })

        const { checkIns } = await fetchUserCheckInsHistoryService.execute({
            userId: 'juan',
            page: 1
        })


        expect(checkIns).toHaveLength(2)
        expect(checkIns).toEqual([
            expect.objectContaining({ gym_id: 'gym' }),
            expect.objectContaining({ gym_id: 'gym2' }),
        ])
    })

    it('should be able to fetch paginated check-in history', async () => {
        for (let i = 1; i <= 22; i++) {
            await checkInsRepository.create({
                gym_id: `gym${i}`,
                user_id: 'juan',
            })
        }

        const { checkIns } = await fetchUserCheckInsHistoryService.execute({
            userId: 'juan',
            page: 2
        })

        expect(checkIns).toHaveLength(2)
        expect(checkIns).toEqual([
            expect.objectContaining({ gym_id: 'gym21' }),
            expect.objectContaining({ gym_id: 'gym22' }),
        ])
    })
})