import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "../repositories/check-ins-repository";

interface GetUserMetricsServiceRequest {
    userId: string
}

interface GetUserMetricsServiceResponse {
    checkInsCount: number
}

export class GetUserMetricsService {
    private checkInsRepository: CheckInsRepository

    constructor(checkInsRepositoryParams: any) {
        this.checkInsRepository = checkInsRepositoryParams
    }

    async execute({ userId}: GetUserMetricsServiceRequest): Promise<GetUserMetricsServiceResponse> {
        const checkInsCount = await this.checkInsRepository.countByUserId(userId)

        return {
            checkInsCount
        }
    }
}