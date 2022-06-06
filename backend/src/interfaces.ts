interface User {
    avatar: string,
    id: number,
    username: string,
	wins: number,
	losses: number,
}

interface Room {
    id: number;
    name: string;
}



interface Message {
    id:number;
    content: string;
    user: User;
    room: Room;
    type: boolean;
}

export {User, Room, Message}