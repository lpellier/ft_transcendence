import { Injectable } from '@nestjs/common';
import { Stats, PrismaClient } from '@prisma/client';

@Injectable()
export class StatsService {
	constructor(private readonly prisma: PrismaClient) {}

	// watch out, this function it just for testing
	async newStat(){
		const newUser = await this.prisma.stats.create({
			data: {
					userId : 4,
				},
			})
	   }

	async findAll() {
		return this.prisma.stats.findMany({});
	  }

	  async findLeaders() {
		return this.prisma.stats.findMany({
			orderBy: {
				level: 'desc',
			  }, 
			take : 3,
		});
	  }
	  
}
