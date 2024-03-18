import { compare } from "bcryptjs";
import { UsersRepository } from "../repositories/users-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { User } from "@prisma/client";

interface AuthenticateServiceRequest {
    email: string;
    password: string;
}

interface AuthenticateServiceResponse {
    user: User;
}

export class AuthenticateService {
    private userRepository: any

    constructor(userRepositoryParam: UsersRepository) {
        this.userRepository = userRepositoryParam
    }

    async execute({ email, password, }: AuthenticateServiceRequest): Promise<AuthenticateServiceResponse> {
        const user = await this.userRepository.findByEmail(email)

        if (!user) {
            throw new InvalidCredentialsError()
        }

        const doesPasswordMatches = await compare(password, user.password_hash)

        if (!doesPasswordMatches) {
            throw new InvalidCredentialsError()
        }

        return {
            user
        }
    }
}