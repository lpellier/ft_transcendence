import { Body, Controller, Get, Post, Query, Redirect, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
	constructor(
		private authService: AuthService,
		private configService: ConfigService) {}

	@UseGuards(AuthGuard('oauth2'))
	@Get()
	async login (@Req() req, @Res({passthrough: true}) res: Response) {
		if (req.user.tfa === true) {
			return this.authService.generateGoogleAuthenticatorToken(req.user.tfaSecret);
		}
		const TOKEN = await this.authService.login(req.user);
		res.cookie('jwt', TOKEN['access_token']);
		return TOKEN;
	}

	@UseGuards(AuthGuard('oauth2'))
	@Post('google-authenticator')
	async google_authenticator_login(@Req() req: Request, @Res({passthrough: true}) res: Response) {
		const validated = await this.authService.validateGoogleAuthenticatorToken(req.user, req.body)
		if (validated === true) {
			const TOKEN = await this.authService.login(req.user);
			res.cookie('jwt', TOKEN['access_token']);
			return TOKEN;
		} else {
			return false;
		}
	}


}