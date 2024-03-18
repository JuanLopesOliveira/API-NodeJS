import { FastifyRequest, FastifyReply } from "fastify"
import { makeGetUserMetricsService } from "../../../services/factories/make-get-user-metrics-service"

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
    const checkInsMetrics = makeGetUserMetricsService()

    const { checkInsCount } = await checkInsMetrics.execute({
        userId: request.user.sub
    })

    return reply.status(200).send({
        checkInsCount
    })
}