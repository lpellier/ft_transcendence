interface User {
	id: number;
	username: string;
	tfa: boolean;
	victories: number;
	losses: number;
	level: number;
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

export {User, init_user, Room, Message}