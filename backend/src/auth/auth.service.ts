import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { authenticator } from 'otplib';
import { Authentication } from './interfaces/authentication.interface';
import axios from 'axios';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService
	) {}

	async validateUser(accessToken: string): Promise<any> {
		const { data } = await axios({
			'url': 	'https://api.intra.42.fr/v2/me',
			'headers': {
				'Authorization': "Bearer " + accessToken }
		});
		return data;
	}

	async login(userId: number, isAuthenticated: boolean): Promise<Authentication> {
		const payload = {sub: userId, isAuthenticated};
		const type = isAuthenticated ? "jwt" : "jwt-2fa";

		const authentication = {
			type,
			token: this.jwtService.sign(payload)
		};
		return authentication;
	}

	async validateGoogleAuthenticatorToken(userId: number, body) {
		const { tfaSecret } = await this.usersService.findOne(userId);
		if (!tfaSecret) {
			return false;
		}
		const validated = authenticator.check(body.token, tfaSecret);
		return validated;
	}
}