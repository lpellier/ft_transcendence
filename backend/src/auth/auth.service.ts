import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';
import { UsersService } from 'src/users/users.service';
import { authenticator } from 'otplib';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService
	) {}

	async validateUser(accessToken): Promise<any> {
		const profile = await axios({
			'url': 	'https://api.intra.42.fr/v2/me',
			'headers': {
				'Authorization': "Bearer " + accessToken }
		});
		return profile
	}
	
	async validateGoogleAuthenticatorToken(userPayload, body) {
		let validated = false;
		const user = await this.usersService.findOne(userPayload.id);
		if (!user) {
			return false;
		}
		try {
			validated = authenticator.check(body.token, user.tfaSecret)
		}
		catch(err) {
			console.log(err)
		}
		return validated;
	}

	async login2fa(user: any) {
		const payload = {username: user.username, sub: user.id, isAuthenticated: false}
		return {
			access_token: this.jwtService.sign(payload)
		};
	}

	async login(user: any) {
		const payload = {username: user.username, sub: user.id, isAuthenticated: true}
		return {
			access_token: this.jwtService.sign(payload)
		};
	}
}