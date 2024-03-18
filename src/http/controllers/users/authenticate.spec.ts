import request from "supertest"
import { app } from "../../../app"
import { afterAll, beforeEach, describe, expect, it } from "vitest"

describe('Authenticate (e2e)', () => {
    beforeEach(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to authenticate', async () => {
        await request(app.server)
            .post('/users')
            .send({
                nome: 'oslai',
                email: 'oslai@teste.com',
                password: '123456'
            })

        const response = await request(app.server)
            .post('/sessions')
            .send({
                email: 'oslai@teste.com',
                password: '123456'
            })

        expect(response.statusCode).toEqual(200)
        expect(response.body).toEqual({
            token: expect.any(String)
        })
    })
})