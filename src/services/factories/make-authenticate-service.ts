import { PrismaUserRepository } from "../../repositories/prisma/prisma-users-repository"
import { AuthenticateService } from "../authenticate"

export function makeAuthenticateService() {
    const prismaUserRepository = new PrismaUserRepository()
    const authenticateService = new AuthenticateService(prismaUserRepository)

    return authenticateService
} 