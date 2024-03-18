import fastify from "fastify"
import { ZodError } from "zod"
import { env } from "./env"
import fastifyJwt from "@fastify/jwt"
import fastifyCookie from "@fastify/cookie"
import { usersRoutes } from "./http/controllers/users/routes"
import { gymsRoutes } from "./http/controllers/gyms/routes"
import { checkInsRoutes } from "./http/controllers/checkIns/routes"
import { aP } from "vitest/dist/reporters-1evA5lom"

export const app = fastify()

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie: {
        cookieName: 'refreshToken',
        signed: false
    },
    sign: {
        expiresIn: "10m"
    }
})

app.register(fastifyCookie)

app.register(usersRoutes)
app.register(gymsRoutes)
app.register(checkInsRoutes)

app.setErrorHandler((error, request, reply) => {
    if (error instanceof ZodError) {
        return reply.status(400).send("Validation error: " + error.message)
    }

    if(env.NODE_ENV !== 'production') {
        console.error(error)
    }

    return reply.status(500).send(error)
})