import { Module } from '@nestjs/common';
import { StatsService } from './stats.service';
import { StatsController } from './stats.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [StatsController],
  providers: [StatsService, PrismaClient],
  exports: [StatsService]
})
export class StatsModule {}