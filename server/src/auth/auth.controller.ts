import { Body, Controller, Get, Query, Redirect, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
	constructor(private auth: AuthService) {}

	@Get()
	@Redirect('https://api.intra.42.fr/oauth/authorize?client_id=599878db9c7f713d0988e2c1e2672a5d888593be77d49fed8bec54b4b1d404bc&redirect_uri=http%3A%2F%2F127.0.0.1%3A3001%2Fauth%2Fcallback&response_type=code')
	redirect() {}

	@UseGuards(AuthGuard('oauth2'))
	@Get('auth/callback')
	signin (@Req() req) {
		return req.user;
	}
}
