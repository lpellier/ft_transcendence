import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client'

@Injectable()
export class UsersService {
	constructor(private readonly prisma: PrismaClient) {};

	async create(user: User) {
		return await this.prisma.user.create({
			data: {
				id:	user.id,
				username: user.username,
				avatar: user.avatar,
			}});
	}

	async findOrCreate(user: User): Promise<User | undefined> {
		let u = await this.prisma.user.findUnique({
			where: { id: user.id },
		});
		if (!u) {
			u = await this.create(user);
		}
		return u;
	}
}
