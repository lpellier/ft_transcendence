import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
	constructor(private users: UsersService) {}

	async findOrCreate(profile: any): Promise<any> {
		let user = await this.users.find(profile.id);
		if (!user) {
			user = await this.users.create({ id: profile.id, username: profile.login, avatar: profile.image_url });
		}
		return user;
	}
}
