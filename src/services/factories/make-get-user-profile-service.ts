import { PrismaUserRepository } from "../../repositories/prisma/prisma-users-repository"
import { GetUserProfileService } from "../get-user-profile"

export function makeGetUserProfileService() {
    const prismaUserRepository = new PrismaUserRepository()
    const getUserProfileService = new GetUserProfileService(prismaUserRepository)

    return getUserProfileService
}