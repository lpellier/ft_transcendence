import { Body, Controller, Get, Post, Query, Redirect, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
	constructor(
		private authService: AuthService,
		private configService: ConfigService) {}

	@UseGuards(AuthGuard('oauth2'))
	@Get()
	async login (@Req() req, @Res({passthrough: true}) res: Response) {
		const TOKEN = await this.authService.login(req.user);
		const URL = this.configService.get('FRONT_URL') + '/home';
		res.cookie('jwt', TOKEN['access_token']);
		return TOKEN;
	}
}