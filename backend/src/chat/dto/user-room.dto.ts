import { IsNotEmpty} from 'class-validator';

export class UserRoomDto {
    @IsNotEmpty()
    userId: number;
    
    @IsNotEmpty()
    roomId: number;
};
