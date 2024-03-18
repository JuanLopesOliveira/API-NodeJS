import { PrismaUserRepository } from "../../repositories/prisma/prisma-users-repository"
import { RegisterService } from "../register"

export function makeRegisterService() {
    const prismaUserRepository = new PrismaUserRepository()
    const registerService = new RegisterService(prismaUserRepository)

    return registerService
}