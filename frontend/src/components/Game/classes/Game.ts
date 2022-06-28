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

	over() : boolean {
		if (this.score[0] >= this.score_limit || this.score[1] >= this.score_limit)
			return true;
		return false;
	}

	scorePoint(invert : boolean) {
		frame_count_shake = 0;
		consts.playScore();
		this.pong.velocity = [0, 0];
		this.pong.pos = [consts.WIDTH / 2 - consts.PONG_DIAMETER / 2, consts.HEIGHT / 2 - consts.PONG_DIAMETER / 2];
		if (!invert) {
			if (this.pong.value === -1 && this.score[0] > 0)
				this.score[0]--;
			else
				this.score[1] += this.pong.value;
		}
		else {
			if (this.pong.value === -1 && this.score[1] > 0)
				this.score[1]--;
			else
				this.score[0] += this.pong.value;
		}
		setTimeout(() => {
			this.setState("relaunch-countdown");
			this.timer = 2;
			for (let i = 0; i < 3; i++) {
				setTimeout(() => {
					this.timer--;
					if (this.timer === 0)
						consts.playBip(consts.BIP_FINAL);
					else if (this.timer > 0)
						consts.playBip(consts.BIP);
					if (this.timer === -1 && this.state === "relaunch-countdown")
						this.setState("in-game");
				}, i * 1000);
			}
			if (invert)
				this.pong.relaunchPong("right");
			else
				this.pong.relaunchPong("left");
			if (this.over())
				this.setState("game-over");
			this.frames_since_point = 0;
		}, 500);
	}

	setState(state : string) {
		this.state = state;
		consts.playAppropriateMusic();
	}
};
