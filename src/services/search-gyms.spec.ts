import { beforeEach, describe, expect, it } from "vitest"
import { InMemoryCheckInsRepository } from "../repositories/in-memory/in-memory-check-ins-repository"
import { FetchUserCheckInsHistoryService } from "./fetch-user-check-ins-history"
import { InMemoryGymsRepository } from "../repositories/in-memory/in-memory-gyms-repository"
import { SearchGymsService } from "./search-gyms"

let gymsRepository: InMemoryGymsRepository
let searchGymsService: SearchGymsService

describe('Search gyms by title', () => {
    beforeEach(async () => {
        gymsRepository = new InMemoryGymsRepository()
        searchGymsService = new SearchGymsService(gymsRepository)
    })

    it('should be able to search for gyms', async () => {
        await gymsRepository.create({
            title: "gym1",
            latitude: '50',
            longitude: '50',
            description: null,
            phone: null,
        })

        await gymsRepository.create({
            title: "gym2",
            latitude: '60',
            longitude: '60',
            description: null,
            phone: null,
        })

        const { gyms } = await searchGymsService.execute({
            search: 'gym1',
            page: 1
        })

        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([expect.objectContaining({ title: 'gym1' })])
    })

    it('should be able to fetch paginated gyms search', async () => {
        for (let i = 1; i <= 22; i++) {
            await gymsRepository.create({
                title: `gym${i}`,
                latitude: '50',
                longitude: '50',
                description: null,
                phone: null,
            })
        }

        const { gyms } = await searchGymsService.execute({
            search: 'gym',
            page: 2
        })

        expect(gyms).toHaveLength(2)
        expect(gyms).toEqual([
            expect.objectContaining({ title: 'gym21' }),
            expect.objectContaining({ title: 'gym22' })
        ])
    })
})