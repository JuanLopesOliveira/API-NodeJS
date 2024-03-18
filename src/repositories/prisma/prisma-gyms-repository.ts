import { Gym, Prisma } from "@prisma/client";
import { FindManyGymsNearbyMeParams, GymsRepository } from "../gyms-repository";
import { prisma } from "../../lib/prisma";

export class PrismaGymsRepository implements GymsRepository {
    async findById(id: string) {
        const gym = await prisma.gym.findFirst({
            where: {
                id: id
            }
        })

        return gym
    }
    async findManyByTitle(search: string, page: number) {
        const gym = await prisma.gym.findMany({
            where: {
                title: {
                    contains: search
                }
            },
            take: 20,
            skip: (page - 1) * 20
        })

        return gym
    }
    async findManyGymsNearbyMe({ latitude, longitude }: FindManyGymsNearbyMeParams) {
        const gyms = await prisma.$queryRaw<Gym[]>`
            SELECT * FROM gyms
            WHERE (6371 * acos(cos(radians(${latitude})) * cos(radians(latitude)) * cos(radians(longitude) - radians(${longitude})) + sin(radians(${latitude})) *sin(radians(latitude)))) <= 10
        `
        //WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10

        return gyms
    }
    async create(data: Prisma.GymCreateInput) {
        const gym = await prisma.gym.create({
            data,
        })

        return gym
    }

}