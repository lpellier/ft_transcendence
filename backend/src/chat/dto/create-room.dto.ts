import { IsNumber, IsString, Length, MinLength } from "class-validator";

export class CreateRoomDto {
    @IsString()
    @Length(2, 15)
    name: string;

    @IsNumber()
    userId: number;
    
    @IsString()
    visibility: string;
    
    @IsString()
    password:string;
};