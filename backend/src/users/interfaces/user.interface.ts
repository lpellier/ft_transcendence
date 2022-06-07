import { Stats } from "@prisma/client";

export interface User {
    id: number;
    username: string;
    avatar: string;
    tfa: boolean;
}

export interface Profile {
    id: number;
    username: string;
    avatar: string;
    stats: Stats;
}