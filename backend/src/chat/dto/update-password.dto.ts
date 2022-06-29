import { IsNumber } from "class-validator";

export class UpdatePasswordDto {
    @IsNumber()
    roomId: number;

    @IsNumber()
    password: string;
}