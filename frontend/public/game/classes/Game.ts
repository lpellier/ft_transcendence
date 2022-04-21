class Game {
	players : Player[];
	pong : Pong;
	score : [number, number];
	timer : number;
	state : string;
	room_id : string;
	publicity : string;
	local : boolean;
	framesSincePoint : number;
	score_limit : number;

	constructor() {
		this.reset();
	}

	reset() {
		this.players = [];
		this.pong = null;
		this.score = [0, 0];
		this.timer = 4;
		this.state = "in-menu";
		this.room_id = "null";
		this.publicity = "public";
		this.local = false;
		this.framesSincePoint = 0;
		this.score_limit = 10;
	}
};
