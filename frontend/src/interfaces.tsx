interface User {
	id: number;
    avatar: string;
    username: string;
	Friends: [Friend];
	auth: Auth;
	stats: Stats;
}

const init_user = {} as User

interface Stats {
	level: number;
	wins: number;
	losses: number;
}

const init_stats = {} as Stats

interface Friend {
	friend: User;
	status: string;
}

interface Auth {
	tfa: boolean;
	otpsecret: string;
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


export {User, init_user, Stats, init_stats, Room, Message, Auth}