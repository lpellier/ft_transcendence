import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-oauth2";
import { AuthService } from "./auth.service";

@Injectable()
export class OAuth2Strategy extends PassportStrategy(Strategy, 'oauth2') {
	constructor(private authService: AuthService, private configService: ConfigService) {
		super({
			authorizationURL: 'https://api.intra.42.fr/oauth/authorize',
			tokenURL: 'https://api.intra.42.fr/oauth/token',
			clientID: configService.get("CLIENT_ID"),
			clientSecret: configService.get("CLIENT_SECRET"),
			callbackURL: configService.get("BACK_URL") + "/auth"
		});
	}

	async validate(accessToken): Promise<any> {
		const user = await this.authService.getUser(accessToken);
		if (!user) {
			throw new UnauthorizedException();
		}
		return user;
	}
}