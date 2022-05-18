
interface User {
    avatar: string,
    id: number,
    name: string,
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