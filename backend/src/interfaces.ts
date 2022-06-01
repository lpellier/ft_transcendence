interface User {
    avatar: string,
    id: number,
    username: string,
}

interface Room {
    id: number;
    name: string;
    ownerId: number;
}



interface Message {
    id:number;
    content: string;
    user: User;
    room: Room;
    type: boolean;
}

export {User, Room, Message}