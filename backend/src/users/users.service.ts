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

	async find(id: number): Promise<User | undefined> {
		return this.prisma.user.findUnique({
			where: { id: id },
		});
	}
}
