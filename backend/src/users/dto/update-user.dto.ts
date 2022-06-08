import { IsOptional } from "class-validator";

export class UpdateUserDto {
	@IsOptional()
	username: string;
	
	@IsOptional()
	avatar: string;

	@IsOptional()
	tfa: boolean;
}
