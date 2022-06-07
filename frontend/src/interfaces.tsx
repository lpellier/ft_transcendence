
interface User {
    id: number,
    avatar: string,
    username: string,
}

interface Room {
    id: number;
    name: string;
    ownerId: number;
    visibility: string;
}

interface Message {
    id:number;
    content: string;
    userId: number;
    roomId: number;
    type: boolean;
}

export {User, Room, Message}