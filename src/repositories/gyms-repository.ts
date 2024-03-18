import { Gym, Prisma } from "@prisma/client";

export interface FindManyGymsNearbyMeParams {
    latitude: number
    longitude: number
}

export interface GymsRepository {
    findById(id: string): Promise<Gym | null>
    findManyByTitle(search: string, page: number): Promise<Gym[] | null>
    findManyGymsNearbyMe(params: FindManyGymsNearbyMeParams): Promise<Gym[] | null>
    create(data: Prisma.GymCreateInput): Promise<Gym>
}