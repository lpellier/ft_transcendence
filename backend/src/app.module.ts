import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ChatGateway } from './chat.gateway';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [AuthModule, UsersModule, ConfigModule.forRoot(), ChatModule],
  providers: [ChatGateway],
})
export class AppModule {}
