import { FastifyReply, FastifyRequest } from "fastify";

export function verifyUserRole(roleToVefrify: "ADMIN" | "MEMBER") {
    return async (request: FastifyRequest, response: FastifyReply) => {
        const { role } = request.user

        if (role !== roleToVefrify) {
            return response.status(401).send({ message: "Unauthorized" })
        }
    }
}