import { Injectable } from '@nestjs/common';
import { CreateMatchDto } from './dto/create-match.dto';

import { PrismaClient } from '@prisma/client';


@Injectable()
export class GameService {
  constructor(private readonly prisma: PrismaClient) {}

    async createMatch(m_data: CreateMatchDto) {
        const match = await this.prisma.match.create({
            data: {
                ladder: m_data.ladder,
                winnerId: m_data.winnerId,
                loserId: m_data.loserId
            }
        });
        return match.id;
    }

    async incrementVictories(user_id : number) {
        const victories = await this.prisma.stats.update({
            where: {id: user_id},
            data: {
                victories: {increment: 1}
            }
        });
    }

    async incrementLosses(user_id : number) {
        const losses = await this.prisma.stats.update({
            where: {id: user_id},
            data: {
                losses: {increment: 1}
            }
        });
    }

}
