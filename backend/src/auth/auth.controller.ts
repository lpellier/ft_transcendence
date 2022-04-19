import { Body, Controller, Get, Post, Query, Redirect, Req, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
	constructor(
		private authService: AuthService,
		private configService: ConfigService) {}

	// @Get()
	// @Redirect('https://api.intra.42.fr/oauth/authorize?client_id=599878db9c7f713d0988e2c1e2672a5d888593be77d49fed8bec54b4b1d404bc&redirect_uri=http%3A%2F%2F127.0.0.1%3A3001%2Fauth%2Fcallback&response_type=code')
	// redirect() {}

	@UseGuards(AuthGuard('oauth2'))
	@Get('callback')
	@Redirect()
	async login (@Req() req) {
		const TOKEN = await this.authService.login(req.user);
		const URL = this.configService.get('FRONT_URL') + '/token?token=' + TOKEN['access_token'];
		return { url: URL };
	}
}