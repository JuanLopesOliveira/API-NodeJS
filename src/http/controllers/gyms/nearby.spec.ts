import request from "supertest"
import { app } from "../../../app"
import { afterAll, beforeEach, describe, expect, it } from "vitest"
import { createAndAuthenticateUser } from "../../../utils/test/create-and-authenticate-user"

describe('Nearby Gyms (e2e)', () => {
    beforeEach(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to list nearby gyms', async () => {
        const { token } = await createAndAuthenticateUser(app, true)

        const bruh = await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'bilada',
                description: 'some bilada',
                phone: '48961684',
                latitude: 50,
                longitude: 50,
            })

        await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'bilada 2',
                description: 'some 2 biladas',
                phone: '48961684',
                latitude: 51,
                longitude: 51,
            })

        const response = await request(app.server)
            .get('/gyms/nearby')
            .query({
                latitude: 50,
                longitude: 50
            })
            .set('Authorization', `Bearer ${token}`)
            .send()

        expect(response.statusCode).toEqual(200)
        expect(response.body.gyms).toHaveLength(1)
        expect(response.body.gyms).toEqual([
            expect.objectContaining({
                title: 'bilada',
            }),
        ])
    })
})