import { IsNotEmpty, IsNumber} from 'class-validator';

export class UserRoomDto {
    @IsNotEmpty()
    @IsNumber()
    userId: number;
    
    @IsNotEmpty()
    @IsNumber()
    roomId: number;
};
