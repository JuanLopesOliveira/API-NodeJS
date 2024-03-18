import { Gym } from "@prisma/client"
import { GymsRepository } from "../repositories/gyms-repository"

interface FetchNearbyGymsServiceRequest {
    user_latitude: number
    user_longitude: number
}

interface FetchNearbyGymsServiceResponse {
    gyms: Gym[]
}

export class FetchNearbyGymsService {
    private gymsRepository: any

    constructor(gymsRepositoryParams: GymsRepository) {
        this.gymsRepository = gymsRepositoryParams
    }

    async execute({
        user_latitude,
        user_longitude
    }: FetchNearbyGymsServiceRequest): Promise<FetchNearbyGymsServiceResponse> {
        const gyms = await this.gymsRepository.findManyGymsNearbyMe({
            latitude: user_latitude,
            longitude: user_longitude
        })

        return {
            gyms
        }
    }
}