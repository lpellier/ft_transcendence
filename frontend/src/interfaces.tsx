
interface User {
    id: number;
    avatar: string;
    username: string;
	winHistory: number;
	lossHistory: number;
}

interface Room {
    id: number;
    name: string;
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