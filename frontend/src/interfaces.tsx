
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

// interface Stats {
// 	wins: number;
// 	losses: number;
// }

// interface LeaderBoard {
// 	Rank: number;
// 	PlayerName: string;
// 	PlayerLevel: number;
// }

export {User, Room, Message/*Stats*/}