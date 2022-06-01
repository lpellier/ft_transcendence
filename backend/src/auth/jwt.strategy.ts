import { Injectable, PreconditionFailedException, } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { jwtConstants } from "./constants";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Request } from "express";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
	constructor() {
		super({
			jwtFromRequest: JwtStrategy.extractCookie,
			secretOrKey: jwtConstants.secret
		});
	}

	static extractCookie(req: Request) {
		let token = null;
		if (req && req.cookies) {
			token = req.cookies['jwt'];
		}
		return token;
	}

	async validate(payload: any) {
		return { id: payload.sub, username: payload.username };
	}
}