import { Injectable } from '@nestjs/common';
import { User } from './interfaces/users.interface';

@Injectable()
export class UsersService {
	private users: User[] = [];

	create(user: User) {
		this.users.push(user);
		return user;
	}

	find(id: number) {
		const user = this.users.find((user) => user.id === id)

		if (user) {
			return user;
		} else {
			return null;
		}
	}
}
