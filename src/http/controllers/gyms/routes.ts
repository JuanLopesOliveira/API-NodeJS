import { FastifyInstance } from "fastify"
import { verifyJWT } from "../../middlewares/verify-jwt"
import { search } from "./search"
import { nearby } from "./neaby"
import { create } from "./create"
import { verifyUserRole } from "../../middlewares/only-admins"


export async function gymsRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJWT)

    app.get('/gyms/search', search)
    app.get('/gyms/nearby', nearby)

    app.post('/gyms', { onRequest: [verifyUserRole('ADMIN')] }, create)
}