import { Injectable } from '@nestjs/common';
import { Stats, PrismaClient } from '@prisma/client';

@Injectable()
export class StatsService {
	constructor(private readonly prisma: PrismaClient) {}

	async findLeaders() {
		return this.prisma.stats.findMany({
			orderBy: {
				level: 'desc',
			  }, 
			take : 3,
		});
	}
	
}
