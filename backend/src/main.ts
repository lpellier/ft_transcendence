import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	// app.useStaticAssets(join(__dirname, '..', 'public'));
    // app.setBaseViewsDir(join(__dirname, '..', 'views'));
    // app.setViewEngine('hbs');

    app.use((req, res, next) => {
		
		res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
		
		req.header('Access-Control-Allow-Origin', '*');
		req.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        req.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
        next();
    });
	
	app.enableCors({
        allowedHeaders:"*",
        origin: "*"
    });
	await app.listen(3001);
}

bootstrap();
