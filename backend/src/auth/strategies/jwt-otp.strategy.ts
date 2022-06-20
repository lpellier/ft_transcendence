import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstants } from "../constants";
import { JwtPayload } from "../interfaces/jwt-payload.interface";

@Injectable()
export class JwtOtpStrategy extends PassportStrategy(Strategy, 'jwt-otp') {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([JwtOtpStrategy.cookieExtractor]),
			secretOrKey: jwtConstants.secret
		});
	}

	static cookieExtractor(req) {
		let token = null;
		if (req && req.cookies) {
			token = req.cookies['jwt-otp']
		}
		return token;
	}

	async validate(payload: any): Promise<JwtPayload> {
		const user = {id: payload.sub,
			isAuthenticated: payload.isAuthenticated};
	return user;
	}
}