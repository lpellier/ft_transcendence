import { IsNumber, IsDate, IsDateString } from "class-validator";

export class AddMuteDto {
    @IsNumber()
    userId: number;

    @IsNumber()
    roomId: number;
    
    @IsDateString() 
    date: Date;
}