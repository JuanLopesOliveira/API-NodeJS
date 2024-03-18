import { FastifyInstance } from "fastify"
import request from "supertest"
import { prisma } from "../../lib/prisma"
import { hash } from "bcryptjs"

export async function createAndAuthenticateUser(app: FastifyInstance, isAdmin = false) {
    await prisma.user.create({
        data: {
            nome: 'oslai',
            email: 'oslai@teste.com',
            password_hash: await hash('123456', 6),
            role: isAdmin ? 'ADMIN' : 'MEMBER'
        }
    })

    const authResponse = await request(app.server)
        .post('/sessions')
        .send({
            email: 'oslai@teste.com',
            password: '123456'
        })

    const { token } = authResponse.body

    return { token }
}