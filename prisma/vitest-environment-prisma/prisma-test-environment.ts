import { PrismaClient } from '@prisma/client';
import 'dotenv/config'
import { execSync } from 'node:child_process';

import { randomUUID } from "node:crypto";
import { Environment } from "vitest";

function generateDatabaseSchema(schema: string) {
    if (!process.env.DATABASE_URL) {
        throw new Error('DATABASE_URL env variable is not set');
    }

    const url = new URL(process.env.DATABASE_URL)

    url.searchParams.set("schema", schema)

    return url.toString()
}

const prisma = new PrismaClient()

export default <Environment>{
    name: "Prisma",
    transformMode: "web",
    async setup() {
        const schema = randomUUID()
        const databaseURL = generateDatabaseSchema(schema)

        process.env.DATABASE_URL = databaseURL

        execSync('npx prisma migrate deploy')

        return {
            async teardown() {
                await prisma.$executeRawUnsafe(`drop schema if exists "${schema}" cascade`)
                await prisma.$disconnect()
            },
        };
    },
}