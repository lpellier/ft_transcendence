import { Stats } from "@prisma/client";

export interface Profile {
    id: number;
    username: string;
    avatar: string;
    stats: Stats;
}