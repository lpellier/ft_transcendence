import { IsBoolean, IsNumber, IsString } from "class-validator";

export class CreateMessageDto {
    @IsString()
    content: string;

    @IsNumber()
    user: number;
    
    @IsNumber()
    room: number;

    @IsBoolean()
    type: boolean;
}