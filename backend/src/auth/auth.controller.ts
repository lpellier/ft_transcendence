import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { OAuth2AuthGuard } from './guards/oauth2-auth.guard';
import { JwtOtpAuthGuard } from './guards/jwt-otp-auth.guard';
import { ValidateOtpDto } from './dto/validate-otp.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
	constructor(
		private authService: AuthService) {}

	@UseGuards(OAuth2AuthGuard)
	@Get()
	async login(@Req() req, @Res({passthrough: true}) res: Response) {
		const isAuthenticated = !req.user.tfa;
		const authentication = await this.authService.login(req.user.id, isAuthenticated);
		res.cookie(authentication.type, authentication.token);
		return authentication;
	}

	@UseGuards(JwtOtpAuthGuard)
	@Post('google-authenticator')
	async google_authenticator_login(@Req() req, @Res({passthrough: true}) res: Response, @Body() otp: ValidateOtpDto) {
		const validated = await this.authService.validateGoogleAuthenticatorToken(req.user.id, otp)
		if (validated === true) {
			const authentication = await this.authService.login(req.user.id, true);
			res.cookie(authentication.type, authentication.token);
			return authentication;
		}
	}

	@UseGuards(JwtAuthGuard)
	@Get('logout')
	async logout(@Req() req, @Res({passthrough: true}) res: Response) {
		res.cookie('jwt', "");
	}
}