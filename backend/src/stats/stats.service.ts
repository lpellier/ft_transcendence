import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class StatsService {
	constructor(private readonly prisma: PrismaClient) {}

	async findLeaders() {
		return this.prisma.stats.findMany({
			orderBy: {
				victories: 'desc',
			}, 
			take : 3,
		});
	}
}
