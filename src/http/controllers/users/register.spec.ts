import request from "supertest"
import { app } from "../../../app"
import { afterAll, beforeEach, describe, expect, it } from "vitest"

describe('Register (e2e)', () => {
    beforeEach(async  () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to register', async () => {
        const response = await request(app.server)
            .post('/users')
            .send({
                nome: 'oslai',
                email: 'oslai@teste.com',
                password: '123456'
            })

            expect(response.statusCode).toEqual(201)
    })
})