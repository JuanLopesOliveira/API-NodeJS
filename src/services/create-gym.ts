import { Gym } from "@prisma/client";
import { GymsRepository } from "../repositories/gyms-repository";

interface CreateGymServiceParamsIterface {
    title: string
    description: string | null
    phone: string | null
    latitude: number
    longitude: number
}

interface CreateGymServiceResponse {
    gym: Gym
}

export class CreateGymService {
    private gymsRepository: any

    constructor(gymsRepositoryParam: GymsRepository) {
        this.gymsRepository = gymsRepositoryParam
    }

    async execute({
        title,
        phone,
        description,
        latitude,
        longitude
    }: CreateGymServiceParamsIterface): Promise<CreateGymServiceResponse> {

        const gym = await this.gymsRepository.create({
            title,
            phone,
            description,
            latitude,
            longitude
        })

        return {
            gym
        }
    }
}