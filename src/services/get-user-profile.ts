import { User } from "@prisma/client"
import { UsersRepository } from "../repositories/users-repository"
import { ResourceNotFoundError } from "./errors/resource-not-found"

interface GetUserProfileServiceRequest {
    userId: string
}

interface GetUserProfileServiceResponse {
    user: User
}

export class GetUserProfileService {
    private userRepository

    constructor(userRepositoryParams: UsersRepository) {
        this.userRepository = userRepositoryParams
    }

    async execute({ userId }: GetUserProfileServiceRequest): Promise<GetUserProfileServiceResponse> {
        const user = await this.userRepository.findById(userId)

        if (!user) {
            throw new ResourceNotFoundError()
        }

        return {
            user
        }
    }
}