import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { Jwt2faStrategy } from './strategies/jwt-2fa.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { OAuth2Strategy } from './strategies/oauth2.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, OAuth2Strategy, JwtStrategy, Jwt2faStrategy],
  imports: [
	UsersModule,
	PassportModule,
	JwtModule.register({
		secret: jwtConstants.secret,
		signOptions: { expiresIn: "1h" }
	}),
  ]
})
export class AuthModule {}
