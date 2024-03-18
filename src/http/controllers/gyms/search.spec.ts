import request from "supertest"
import { app } from "../../../app"
import { afterAll, beforeEach, describe, expect, it } from "vitest"
import { createAndAuthenticateUser } from "../../../utils/test/create-and-authenticate-user"

describe('Search Gyms (e2e)', () => {
    beforeEach(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to search a gym', async () => {
        const { token } = await createAndAuthenticateUser(app, true)

        await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'bilada',
                description: 'some bilada',
                phone: '48961684',
                latitude: 21.0987654,
                longitude: 22.0987654
            })

        await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'bilada 2',
                description: 'some 2 biladas',
                phone: '48961684',
                latitude: 21.0987600,
                longitude: 22.0987600
            })

        const response = await request(app.server)
            .get('/gyms/search')
            .query({
                query: 'bilada'
            })
            .set('Authorization', `Bearer ${token}`)
            .send()

        console.log(response.body.gyms)

        expect(response.statusCode).toEqual(200)
        expect(response.body.gyms).toHaveLength(2)
        expect(response.body.gyms).toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                title: 'bilada',
              }),
              expect.objectContaining({
                title: 'bilada 2',
              }),
            ])
          );
          
    })
})