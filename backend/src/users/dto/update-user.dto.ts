import { IsBoolean, IsOptional, Matches } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @Matches(/^[a-zA-Z_-]{3,10}$/)
  username: string;

  @IsOptional()
  @IsBoolean()
  tfa: boolean;
}
