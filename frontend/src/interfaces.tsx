
interface User {
    id: number;
    avatar: string;
    username: string;
	winHistory: number;
	lossHistory: number;
    tfa: boolean;
    otpsecret: string;
}

const init_user = {} as User

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

const init_stats = {} as Stats

export {User, init_user, Room, Message, Stats, init_stats}