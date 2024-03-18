import request from "supertest"
import { app } from "../../../app"
import { afterAll, beforeEach, describe, expect, it } from "vitest"
import { createAndAuthenticateUser } from "../../../utils/test/create-and-authenticate-user"

describe('Gym (e2e)', () => {
    beforeEach(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to create a gym', async () => {
        const { token } = await createAndAuthenticateUser(app, true)

        const response = await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'bilada',
                description: 'some bilada',
                phone: '48961684',
                latitude: 21.0987654,
                longitude: 22.0987654
            })

        expect(response.statusCode).toEqual(201)
    })
})