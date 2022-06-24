import { IsNumber, IsString, Length } from "class-validator";

export class CreateRoomDto {
    @IsString()
    name: string;

    @IsNumber()
    userId: number;
    
    @IsString()
    visibility: string;
    
    @IsString()
    password:string;
};