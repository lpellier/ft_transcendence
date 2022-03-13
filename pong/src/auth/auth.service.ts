import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
	constructor(private users: UsersService) {}

	async findOrCreate(profile: any): Promise<any> {
		console.log(profile)
		let user = this.users.find(profile.id);
		if (!user) {
			user = this.users.create({ id: profile.id, login: profile.login, avatar: profile.image_url });
		}
		console.log(user);
		return user;
	}
}
