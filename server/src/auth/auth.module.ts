import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { OAuth2Strategy } from './oauth2.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, OAuth2Strategy],
  imports: [UsersModule, PassportModule]
})
export class AuthModule {}
