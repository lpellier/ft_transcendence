
interface User {
    id: number;
    avatar: string;
    username: string;
	winHistory: number;
	lossHistory: number;
    tfa: boolean;
    otpsecret: string;
}

interface Room {
    id: number;
    name: string;
    ownerId: number;
    visibility: string;
    password: string;
}

interface Message {
    id:number;
    content: string;
    userId: number;
    roomId: number;
    type: boolean;
}

interface Stats {
	id: number;
	wins: number;
	losses: number;
	level: number;
	userId: number;
}

export {User, Room, Message, Stats}