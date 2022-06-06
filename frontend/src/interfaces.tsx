
interface User {
    id: number;
    avatar: string;
    username: string;
	wins: number;
	losses: number;
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

export {User, Room, Message}