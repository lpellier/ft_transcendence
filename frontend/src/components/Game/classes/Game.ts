class Game {
	players : Player[];
	pong : Pong;
	score : [number, number];
	score_limit : number;
	timer : number;
	state : string;
	room_id : string;
	publicity : string;
	local : boolean;
	ai : boolean;
	frames_since_point : number;
	map : GameMap;

	spectator : boolean;
	hover_spectator : boolean;

	constructor() {
		this.reset();
	}

	reset() {
		this.players = [];
		this.pong = null;
		this.score = [0, 0];
		this.score_limit = 10;
		this.timer = 3;
		this.state = "in-menu";
		this.room_id = "null";
		this.publicity = "public";
		this.local = false;
		this.ai = false;
		this.frames_since_point = 0;
		this.map = consts.original_map;
		this.spectator = false;
		this.hover_spectator = false;
	}

	setState(state : string) {
		this.state = state;
		consts.playAppropriateMusic();
	}
};
