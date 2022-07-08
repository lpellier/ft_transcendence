import { Body, Controller, Get, Post, Redirect, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { OAuth2AuthGuard } from './guards/oauth2-auth.guard';
import { JwtOtpAuthGuard } from './guards/jwt-otp-auth.guard';
import { ValidateOtpDto } from './dto/validate-otp.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
	constructor(
		private authService: AuthService) { }

	@Get('mock')
	@Redirect()
	async mockLogin(@Req() req, @Res({passthrough: true}) res: Response) {
		const user = await this.authService.getMock();
		const isAuthenticated = !user.tfa;
		const authentication = await this.authService.login(user.id, isAuthenticated);
		res.cookie(authentication.type, authentication.token, { sameSite: 'strict' , httpOnly: true });
		if (isAuthenticated === true) {
			console.log("user is authenticated")
			return ({ url: 'http://127.0.0.1:3000/game' })}
	}

	@UseGuards(OAuth2AuthGuard)
	@Get()
	@Redirect()
	async login(@Req() req, @Res({ passthrough: true }) res: Response) {
		const isAuthenticated = !req.user.tfa;
		const authentication = await this.authService.login(req.user.id, isAuthenticated);
		res.cookie(authentication.type, authentication.token, { sameSite: 'strict', httpOnly: true });
		if (isAuthenticated === true) {
			console.log("user is authenticated")
			return ({ url: 'http://127.0.0.1:3000/login' })
		// } else {
			// return ({ url: 'http://127.0.0.1:3000/tfauth' })
		}
	}

	@UseGuards(JwtOtpAuthGuard)
	@Get('google-authenticator')
	async googleAuthenticatorLoginCheck() {
		return true;
	}

	@UseGuards(JwtOtpAuthGuard)
	@Post('google-authenticator')
	async googleAuthenticatorLogin(@Req() req, @Res({ passthrough: true }) res: Response, @Body() otp: ValidateOtpDto) {
		const validated = await this.authService.validateGoogleAuthenticatorToken(req.user.id, otp)
		console.log('post google authenticator', validated)
		if (validated === true) {
			const authentication = await this.authService.login(req.user.id, true);
			res.cookie(authentication.type, authentication.token, { sameSite: 'strict', httpOnly: true });
			return true
		}
		return false
	}

	@UseGuards(JwtAuthGuard)
	@Get('logout')
	async logout(@Res({ passthrough: true }) res: Response) {
		res.cookie('jwt', "", { expires: new Date(), sameSite: 'strict', httpOnly: true });
		res.cookie('jwt-otp', "", { expires: new Date(), sameSite: 'strict', httpOnly: true });
	}
}
