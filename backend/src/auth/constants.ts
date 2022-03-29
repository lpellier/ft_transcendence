import { ConfigService } from "@nestjs/config";

export const jwtConstants = {
	secret: (new ConfigService).get('JWT_SECRET')
}