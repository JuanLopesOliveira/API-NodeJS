import { Gym } from "@prisma/client"
import { GymsRepository } from "../repositories/gyms-repository"

interface SearchGymsServiceRequest {
    search: string
    page: number
}

interface SearchGymsServiceResponse {
    gyms: Gym[]
}

export class SearchGymsService {
    private gymsRepository: any

    constructor(gymsRepositoryParam: GymsRepository) {
        this.gymsRepository = gymsRepositoryParam
    }

    async execute({ search, page }: SearchGymsServiceRequest): Promise<SearchGymsServiceResponse> {
        const gyms = await this.gymsRepository.findManyByTitle(search, page)

        return {
            gyms
        }
    }
}