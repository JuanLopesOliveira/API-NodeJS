import { beforeEach, describe, expect, it } from "vitest"
import { InMemoryGymsRepository } from "../repositories/in-memory/in-memory-gyms-repository"
import { FetchNearbyGymsService } from "./fetch-nearby-gyms"

let gymsRepository: InMemoryGymsRepository
let fetchNearbyGymsService: FetchNearbyGymsService

describe('Search gyms by title', () => {
    beforeEach(async () => {
        gymsRepository = new InMemoryGymsRepository()
        fetchNearbyGymsService = new FetchNearbyGymsService(gymsRepository)
    })

    it('should be able to fetch nearby gyms', async () => {
        await gymsRepository.create({
            title: "near",
            latitude: '50',
            longitude: '50',
            description: null,
            phone: null,
        })

        await gymsRepository.create({
            title: "far",
            latitude: '120',
            longitude: '120',
            description: null,
            phone: null,
        })

        const { gyms } = await fetchNearbyGymsService.execute(
            {
                user_latitude: 49.932,
                user_longitude: 49.91,
            }
        )

        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([expect.objectContaining({ title: 'near' })])
    })
})