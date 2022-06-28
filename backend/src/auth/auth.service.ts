import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { authenticator } from 'otplib';
import { Authentication } from './interfaces/authentication.interface';
import { ValidateOtpDto } from './dto/validate-otp.dto';
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
		const type = isAuthenticated ? "jwt" : "jwt-otp";

		const authentication = {
			type,
			token: this.jwtService.sign(payload)
		};
		return authentication;
	}

	async validateGoogleAuthenticatorToken(userId: number, otp: ValidateOtpDto) {
		const { otpSecret } = await this.usersService.findOne(userId);
		console.log('validating ', otp.value)
		console.log(authenticator.generate(otpSecret))
		const validated = authenticator.check(otp.value, otpSecret);
		return validated;
	}
}