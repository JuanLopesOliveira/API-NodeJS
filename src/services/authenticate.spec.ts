import { beforeEach, describe, expect, it } from "vitest"
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository"
import { AuthenticateService } from "./authenticate"
import { hash } from "bcryptjs"
import { InvalidCredentialsError } from "./errors/invalid-credentials-error"

let usersRepository: InMemoryUsersRepository
let authenticateService: AuthenticateService

describe('Authenticate service', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        authenticateService = new AuthenticateService(usersRepository)
    })
    it('should be able to authenticate', async () => {
        await usersRepository.create({
            nome: 'juan',
            email: "juan@juan.com",
            password_hash: await hash('123456', 6)

        })

        const { user } = await authenticateService.execute({
            email: 'juan@juan.com',
            password: '123456',
        })


        expect(user.id).toEqual(expect.any(String))
    })

    it('should not be able to authenticate with wrong email', async () => {
        await expect(() =>
            authenticateService.execute({
                email: 'juan@juan.com',
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

    it('should not be able to authenticate with wrong password', async () => {
        await usersRepository.create({
            nome: 'juan',
            email: "juan@juan.com",
            password_hash: await hash('123456', 6)

        })

        await expect(() =>
            authenticateService.execute({
                email: 'juan@juan.com',
                password: '123457',
            }),
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
}) 