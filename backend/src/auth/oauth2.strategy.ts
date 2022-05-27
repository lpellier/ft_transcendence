import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import axios from "axios";
import { Strategy } from "passport-oauth2";
import { UsersService } from "src/users/users.service";
import { AuthService } from "./auth.service";

@Injectable()
export class OAuth2Strategy extends PassportStrategy(Strategy, 'oauth2') {
	constructor(private usersService: UsersService, private configService: ConfigService, private authService: AuthService) {
		super({
			authorizationURL: 'https://api.intra.42.fr/oauth/authorize',
			tokenURL: 'https://api.intra.42.fr/oauth/token',
			clientID: "599878db9c7f713d0988e2c1e2672a5d888593be77d49fed8bec54b4b1d404bc",
			clientSecret: "5b9d6472412ea93c768a5db21f17766f43929667aac9ce3415648011ab22e684",
			callbackURL: configService.get("BACK_URL") + "/auth"
		});
	}

	async validate(accessToken): Promise<any> {
		const profile = await this.authService.validateUser(accessToken);
		if (!profile) {
			throw new UnauthorizedException();
		}
		const user = await this.usersService.findOrCreate( {id: profile.data.id, username: profile.data.login, avatar: profile.data.image_url})
		return user;
	}
}