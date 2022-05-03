import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ChatModule } from './chat/chat.module';
import { GameModule } from './game/game.module';

@Module({
  imports: [AuthModule, UsersModule, ConfigModule.forRoot({isGlobal: true}), ChatModule, GameModule],
})
export class AppModule {}
