import * as consts from "./Consts"

export class Player {
	pos : [number, number]
	velocity : [number, number];
	width : number;
	height : number;
	color : any;
	index : number;
	id : any;
	ready : boolean;

	constructor(color: any, index : number, id : any) {
		this.pos = [(index == 1 ? consts.MAP_WIDTH / 12 : consts.MAP_WIDTH * 11 / 12), consts.MAP_HEIGHT / 2 - consts.PLAYER_HEIGHT / 2];
		this.velocity = [0, consts.PLAYER_SPEED];
		this.width = consts.PLAYER_WIDTH;
		this.height = consts.PLAYER_HEIGHT;
		this.color = color;
		this.index = index;
		this.id = id;
		this.ready = false;
	}

	reset(players_len : number) {
		if (players_len == 1)
			this.index = 1;
		this.pos = [consts.MAP_WIDTH / 12, consts.MAP_HEIGHT / 2 - consts.PLAYER_HEIGHT / 2];
		this.ready = false;
		this.velocity = [0, consts.PLAYER_SPEED];
	}

	distanceTo(point : [number, number]) : number {
		let dist : number = Math.sqrt(Math.pow((point[0] - (this.pos[0] + this.width / 2)), 2) + Math.pow((point[1] - (this.pos[1] + this.height / 2)), 2));

		return dist;
	}

	calculateNewPos() {
		this.pos[1] += this.velocity[1];
		if (this.pos[1] < 10) // 10 for boundaries
			this.pos[1] = 10;
		if (this.pos[1] + this.height > consts.MAP_HEIGHT - 10) // -10 for boundaries
			this.pos[1] = consts.MAP_HEIGHT - 10 - this.height;
	}

	move_up() {
		this.velocity[1] = -consts.PLAYER_SPEED;
		this.calculateNewPos();
	}

	move_down() {
		this.velocity[1] = consts.PLAYER_SPEED;
		this.calculateNewPos();
	}

	dash(direction : number) {
		if (direction == -1) {
			this.velocity[1] = consts.PLAYER_SPEED * 3;
			this.pos[1] += this.velocity[1];
			if (this.pos[1] + this.height > consts.MAP_HEIGHT - 10) // -10 for boundaries
				this.pos[1] = consts.MAP_HEIGHT - 10 - this.height;
		}
		else {
			this.velocity[1] = -consts.PLAYER_SPEED * 3;
			this.pos[1] += this.velocity[1];
			if (this.pos[1] < 10) // 10 for boundaries
				this.pos[1] = 10;
		}
	}

	left_up() : [number, number] {
		return [this.pos[0], this.pos[1]];
	}

	left_down() : [number, number] {
		return [this.pos[0], this.pos[1] + this.height]
	}

	right_up() : [number, number] {
		return [this.pos[0] + this.width, this.pos[1]];
	}

	right_down() : [number, number] {
		return [this.pos[0] + this.width, this.pos[1] + this.height];
	}
};
