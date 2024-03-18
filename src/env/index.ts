import 'dotenv/config'
import { z } from "zod"

const envSchema = z.object({
    NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
    JWT_SECRET: z.string(),
    PORT: z.coerce.number().default(3335),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
    console.log('Invalid enviroment variables')
    throw new Error('Invalid enviroment variables')
}

export const env = _env.data