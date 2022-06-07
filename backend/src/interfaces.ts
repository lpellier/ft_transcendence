interface User {
    id: number;
    username: string;
    avatar: string;
    tfa: boolean
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