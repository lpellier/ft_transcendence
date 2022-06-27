import { Module } from '@nestjs/common';
import { GameGateway } from 'src/game/game.gateway';
import { GameService } from 'src/game/game.service';
import { PrismaClient } from '@prisma/client';

@Module({
	providers: [GameGateway, GameService, PrismaClient],
})
export class GameModule {}
