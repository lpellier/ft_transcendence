import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaClient } from '@prisma/client';
import { FriendsGateway } from './users.gateway';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaClient, FriendsGateway],
  exports: [UsersService],
})
export class UsersModule {}
