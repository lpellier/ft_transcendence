import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ChatModule } from './chat/chat.module';
import { GameModule } from './game/game.module';

@Module({
<<<<<<< HEAD
  imports: [AuthModule, UsersModule, ConfigModule.forRoot(), ChatModule, GameModule],
=======
  imports: [AuthModule, UsersModule, ConfigModule.forRoot({isGlobal: true}), ChatModule],
>>>>>>> e1c0d278b1f6548aeeab3be56d0f55243eac53e8
})
export class AppModule {}
