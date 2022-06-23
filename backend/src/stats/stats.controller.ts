import { Controller } from '@nestjs/common';
import { StatsService } from './stats.service';
import { AuthGuard } from '@nestjs/passport';
import { Get, Post, Put, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';


// @UseGuards(AuthGuard('jwt'))
@Controller('stats')
export class StatsController {
	constructor(private readonly  statsService :  StatsService ) {}
	
	@Get('lead')
	findLeaders()
	{
		return this.statsService.findLeaders();
	}
}