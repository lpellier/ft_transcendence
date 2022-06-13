import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser'
import { ConfigService } from "@nestjs/config";
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.use(cookieParser());
	app.useGlobalPipes(new ValidationPipe({
		whitelist: true,
		forbidNonWhitelisted: true
	}));
	app.enableCors({
		origin: (new ConfigService).get("FRONT_URL"),
		credentials: true
	});
	await app.listen(3001);
}

bootstrap();