import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { StatsModule } from './stats/stats.module';
import { ChatModule } from './chat/chat.module';
import { GameModule } from './game/game.module';
import { FriendsModule } from './friends/friends.module';
import { BlockedModule } from './blocked/blocked.module';

@Module({
  imports: [AuthModule, UsersModule, StatsModule, ConfigModule.forRoot({isGlobal: true}), ChatModule, GameModule, FriendsModule, BlockedModule],
})
export class AppModule {}
