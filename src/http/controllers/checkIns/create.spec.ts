import request from "supertest"
import { app } from "../../../app"
import { afterAll, beforeEach, describe, expect, it } from "vitest"
import { createAndAuthenticateUser } from "../../../utils/test/create-and-authenticate-user"
import { prisma } from "../../../lib/prisma"

describe('Check-Ins (e2e)', () => {
    beforeEach(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to create a check-in', async () => {
        const { token } = await createAndAuthenticateUser(app)

        const gym = await prisma.gym.create({
            data: {
                title: 'gym test',
                latitude: 31,
                longitude: 31,
            }
        })

        const response = await request(app.server)
            .post(`/gyms/${gym.id}/check-ins`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                latitude: 31,
                longitude: 31
            })

        expect(response.statusCode).toEqual(201)
    })
})