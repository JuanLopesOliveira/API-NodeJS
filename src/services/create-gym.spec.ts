import { beforeEach, describe, expect, it } from "vitest"
import { InMemoryGymsRepository } from "../repositories/in-memory/in-memory-gyms-repository"
import { CreateGymService } from "./create-gym"

let gymsRepository: InMemoryGymsRepository
let createGymService: CreateGymService

describe('Create Gym Service', () => {
    beforeEach(() => {
        gymsRepository = new InMemoryGymsRepository()
        createGymService = new CreateGymService(gymsRepository)
    })

    it('should be able to create a gym', async () => {

        const { gym } = await createGymService.execute({
            title: "node gym",
            description: null,
            phone: null,
            latitude: 150,
            longitude: 150,
        })


        expect(gym.id).toEqual(expect.any(String))
    })
}) 