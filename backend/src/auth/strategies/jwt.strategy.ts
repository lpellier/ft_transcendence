import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { jwtConstants } from "../constants";
import { JwtPayload } from "../interfaces/jwt-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: jwtConstants.secret
		});
	}

	async validate(payload: any): Promise<JwtPayload> {
		if (payload.isAuthenticated === true) {
			const user = {id: payload.sub,
				isAuthenticated: payload.isAuthenticated};
			return user;
		}
	}
}