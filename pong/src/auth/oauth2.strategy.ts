import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-oauth2";
import { AuthService } from "./auth.service";
import axios from 'axios';

@Injectable()
export class OAuth2Strategy extends PassportStrategy(Strategy, 'oauth2') {
	constructor(private authService: AuthService) {
		super({
			authorizationURL: 'https://api.intra.42.fr/oauth/authorize',
			tokenURL: 'https://api.intra.42.fr/oauth/token',
			clientID: "599878db9c7f713d0988e2c1e2672a5d888593be77d49fed8bec54b4b1d404bc",
			clientSecret: "5b9d6472412ea93c768a5db21f17766f43929667aac9ce3415648011ab22e684",
			callbackURL: "http://127.0.0.1:3001/auth/callback",
		});
	}

	async validate(accessToken): Promise<any> {
		console.log("Bearer " + accessToken)
		let profile = await axios({
			'url': 	'https://api.intra.42.fr/v2/me',
			'headers': {
				'Authorization': "Bearer " + accessToken }
		});
		if (!profile){
			return null;
		}
		let user = await this.authService.findOrCreate(profile.data);		
		return user;
	}
}