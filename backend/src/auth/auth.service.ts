import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import axios from 'axios';

@Injectable()
export class AuthService {
	constructor(
		private users: UsersService,
		private jwtService: JwtService
	) {}

	async getUser(accessToken): Promise<any> {
		let profile = await axios({
			'url': 	'https://api.intra.42.fr/v2/me',
			'headers': {
				'Authorization': "Bearer " + accessToken }
		});
		if (profile) {
			const result =  this.users.findOrCreate(
				{	id: profile.data.id, username: profile.data.login,
					avatar: profile.data.image_url });
			return result;	
		}
		return null;
	}

	async login(user: any) {
		const payload = {username: user.username, sub: user.id}
		return {
			access_token: this.jwtService.sign(payload)
		};
	}
}
