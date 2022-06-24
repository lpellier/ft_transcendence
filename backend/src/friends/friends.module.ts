import { Module } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { FriendsGateway } from './friends.gateway';
import { PrismaClient } from '@prisma/client';

@Module({
  providers: [FriendsGateway, FriendsService, PrismaClient],
})
export class FriendsModule {}
