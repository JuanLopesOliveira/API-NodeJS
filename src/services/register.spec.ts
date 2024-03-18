import { beforeEach, describe, expect, it } from "vitest"
import { RegisterService } from "./register"
import { compare } from "bcryptjs"
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository"
import { UserAlreadyExistsError } from "./errors/user-already-exists-error"

let usersRepository: InMemoryUsersRepository
let registerService: RegisterService

describe('Register service', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        registerService = new RegisterService(usersRepository)
    })

    it('register', async () => {

        const { user } = await registerService.execute({
            nome: 'teste',
            email: 'testando5@testando.com',
            password: '123456',
        })


        expect(user.id).toEqual(expect.any(String))
    })

    it('hashing password work', async () => {
        const { user } = await registerService.execute({
            nome: 'teste',
            email: 'testando5@testando.com',
            password: '123456',
        })

        const isPasswordCorrectlyHashed = await compare(
            '123456',
            user.password_hash
        )

        expect(isPasswordCorrectlyHashed).toBe(true)
    })

    it('doest not tregister with same email twice', async () => {
        const email = 'bilada@circulation'

        await registerService.execute({
            nome: 'teste',
            email,
            password: '123456',
        })

        await expect(registerService.execute({
            nome: 'teste',
            email,
            password: '123456',
        })
        ).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })
}) 