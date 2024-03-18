import { hash } from "bcryptjs"
import { UsersRepository } from "../repositories/users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { User } from "@prisma/client";

interface RegisterServiceParamsIterface {
    nome: string;
    email: string;
    password: string;
}

interface RegisterServiceResponse {
    user: User
}

export class RegisterService {
    private userRepository: any

    constructor(userRepositoryParam: UsersRepository) {
        this.userRepository = userRepositoryParam
    }

    async execute({
        nome,
        email,
        password,
    }: RegisterServiceParamsIterface): Promise<RegisterServiceResponse> {
        const password_hash = await hash(password, 6)

        const chekcIfEmailExists = await this.userRepository.findByEmail(email)

        if (chekcIfEmailExists) {
            throw new UserAlreadyExistsError()
        }

        const user = await this.userRepository.create({
            nome,
            email,
            password_hash,
        })

        return { user }
    }
}