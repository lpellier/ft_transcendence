import { Module } from '@nestjs/common';
import { BlockedService } from './blocked.service';
import { BlockedGateway } from './blocked.gateway';
import { PrismaClient } from '@prisma/client';

@Module({
  providers: [BlockedGateway, BlockedService, PrismaClient],
})
export class BlockedModule {}
