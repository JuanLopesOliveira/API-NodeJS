import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { makeFetchNearbyGymsService } from "../../../services/factories/make-fetch-nearby-gyms-service"

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
    const nearbyGymsQueryParams = z.object({
        latitude: z.coerce.number().refine((value) => {
            return Math.abs(value) <= 90
        }),
        longitude: z.coerce.number().refine((value) => {
            return Math.abs(value) <= 180
        })
    })

    const { latitude, longitude } = nearbyGymsQueryParams.parse(request.query)

    const searchGymsNearbyMe = makeFetchNearbyGymsService()

    const { gyms } = await searchGymsNearbyMe.execute({
        user_latitude: latitude,
        user_longitude: longitude
    })

    return reply.status(200).send({
        gyms
    })
}