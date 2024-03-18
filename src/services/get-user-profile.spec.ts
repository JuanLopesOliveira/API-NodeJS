import { beforeEach, describe, expect, it } from "vitest"
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository"
import { hash } from "bcryptjs"
import { GetUserProfileService } from "./get-user-profile"
import { ResourceNotFoundError } from "./errors/resource-not-found"

let usersRepository: InMemoryUsersRepository
let authenticateService: GetUserProfileService

describe('Get User Profile service', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        authenticateService = new GetUserProfileService(usersRepository)
    })

    it('should be able to get the user profile', async () => {
        const createdUser = await usersRepository.create({
            nome: 'juan',
            email: "juan@juan.com",
            password_hash: await hash('123456', 6)

        })

        const { user } = await authenticateService.execute({
            userId: createdUser.id
        })


        expect(user.nome).toEqual('juan')
    })

    it('should not be able to authenticate with wrong id', async () => {
        await expect(() =>
            authenticateService.execute({
                userId: 'this-id-not-exists',
            }),
        ).rejects.toBeInstanceOf(ResourceNotFoundError)
    })
}) 