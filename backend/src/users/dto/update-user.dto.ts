import { Transform, Type } from "class-transformer";
import { IsBoolean, IsBooleanString, IsOptional, Matches } from "class-validator";

export class UpdateUserDto {
	@IsOptional()
	@Matches(/^[a-zA-Z_-]{3,10}$/)
	username: string;
	
	@IsOptional()
	@Transform( ({ value }) => value === true)
	tfa: boolean;
}
