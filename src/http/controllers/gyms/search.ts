import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { makeSearchGymsService } from "../../../services/factories/make-search-gyms-service"

export async function search(request: FastifyRequest, reply: FastifyReply) {
    const searchGymsQueryParams = z.object({
        query: z.string(),
        page: z.coerce.number().min(1).default(1),
    })

    const { query, page } = searchGymsQueryParams.parse(request.query)

    const searchGyms = makeSearchGymsService()

    const { gyms } = await searchGyms.execute({
        search: query,
        page
    })

    return reply.status(200).send({
        gyms,
    })
}