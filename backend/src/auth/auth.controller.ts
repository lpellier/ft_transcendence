import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { OAuth2AuthGuard } from './guards/oauth2-auth.guard';
import { Jwt2faAuthGuard } from './guards/jwt-2fa-auth.guard';

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

	@UseGuards(Jwt2faAuthGuard)
	@Post('google-authenticator')
	async google_authenticator_login(@Req() req, @Res({passthrough: true}) res: Response) {
		const validated = await this.authService.validateGoogleAuthenticatorToken(req.user.id, req.body)
		if (validated === true) {
			const authentication = await this.authService.login(req.user.id, true);
			res.cookie(authentication.type, authentication.token);
			return authentication;
		}
	}
}