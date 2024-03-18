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

    it('should be able to get the check-ins history', async () => {
        const { token } = await createAndAuthenticateUser(app)

        const user = await prisma.user.findFirstOrThrow()

        const gym = await prisma.gym.create({
            data: {
                title: 'gym test',
                latitude: 31,
                longitude: 31,
            }
        })

        await prisma.checkIn.createMany({
            data: [
                {
                    gym_id: gym.id,
                    user_id: user.id
                },
                {
                    gym_id: gym.id,
                    user_id: user.id
                }
            ]
        })

        const response = await request(app.server)
            .get(`/check-ins/history`)
            .set('Authorization', `Bearer ${token}`)
            .send()

            expect(response.statusCode).toEqual(200)
            expect(response.body.checkIns.length).toEqual(2)
            expect(response.body.checkIns).toEqual([
                expect.objectContaining({
                    gym_id: gym.id,
                    user_id: user.id
                }),
                expect.objectContaining({
                    gym_id: gym.id,
                    user_id: user.id
                })
            ])
    })
})