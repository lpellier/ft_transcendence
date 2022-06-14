import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { User } from "@prisma/client";
import { Strategy } from "passport-oauth2";
import { UsersService } from "src/users/users.service";
import { AuthService } from "../auth.service";

@Injectable()
export class OAuth2Strategy extends PassportStrategy(Strategy, 'oauth2') {
	constructor(private usersService: UsersService,
				private configService: ConfigService, 
				private authService: AuthService) {
		super({
			authorizationURL: 'https://api.intra.42.fr/oauth/authorize',
			tokenURL: 'https://api.intra.42.fr/oauth/token',
			clientID: configService.get("CLIENT_ID"),
			clientSecret: configService.get("CLIENT_SECRET"),
			callbackURL: configService.get("BACK_URL") + "/auth"
		});
	}

	async validate(accessToken: string): Promise<User> {
		const profile = await this.authService.validateUser(accessToken);
		if (!profile) {
			throw new UnauthorizedException();
		}
		const user = await this.usersService.findOrCreate({id: profile.id, username: profile.login, avatar: profile.image_url})
		return user;
	}
}