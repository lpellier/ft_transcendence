import { MAP_WIDTH, MAP_HEIGHT } from "./server";

let PLAYER_SPEED = 6;
let PLAYER_WIDTH = 15;
export let PLAYER_HEIGHT = 60;

export class Player {
	pos : [number, number]
	velocity : [number, number];
	width : number;
	height : number;
	color : any;
	index : number;
	id : any;
	ready : boolean;
	move_read : boolean;

	constructor(color: any, index : number, id : any) {
		this.pos = [(index == 1 ? MAP_WIDTH / 12 : MAP_WIDTH * 11 / 12), MAP_HEIGHT / 2 - PLAYER_HEIGHT / 2];
		this.velocity = [0, PLAYER_SPEED];
		this.width = PLAYER_WIDTH;
		this.height = PLAYER_HEIGHT;
		this.color = color;
		this.index = index;
		this.id = id;
		this.ready = false;
		this.move_read = false;
	}

	reset(players_len : number) {
		if (players_len == 1)
			this.index = 1;
		this.pos = [MAP_WIDTH / 12, MAP_HEIGHT / 2 - PLAYER_HEIGHT / 2];
		this.ready = false;
		this.move_read = false;
		this.velocity = [0, PLAYER_SPEED];
	}

	distanceTo(point : [number, number]) : boolean {
		let dist : number = Math.sqrt(Math.pow((point[0] - (this.pos[0] + this.width / 2)), 2) + Math.pow((point[1] - (this.pos[1] + this.height / 2)), 2));

		if (dist < 50)
			return true;
		return false;
	}

	checkCollisions(game : any) {
		if (this.distanceTo([game.pong.pos[0] + game.pong.diameter / 2, game.pong.pos[1] + game.pong.diameter / 2])) {
			let angle : [boolean, number, string, string] = [false, 0, "y", "middle"];
			angle = game.collision_paddle(this, angle);
			if (angle[0] == true) {
				// ? for bot / top collisions
				if (angle[2] == "x") {
					if (angle[3] == "top")
						game.pong.velocity[1] = game.pong.speed * -Math.cos(angle[1]);
					else if (angle[3] == "bot")
						game.pong.velocity[1] = game.pong.speed * Math.cos(angle[1]);
					game.pong.velocity[0] = game.pong.speed * -Math.sin(angle[1]);
				}
				// ? invert velocity indexes for left / right collisions
				else if (angle[2] == "y") {
					if (game.pong.pos[0] < MAP_WIDTH / 2)
						game.pong.velocity[0] = game.pong.speed * Math.cos(angle[1]);
					else
						game.pong.velocity[0] = game.pong.speed * -Math.cos(angle[1]);
					game.pong.velocity[1] = game.pong.speed * -Math.sin(angle[1]);	
				}
			}
		}
	}

	move_up(game : any) {
		if (!this.move_read) {
			this.move_read = true;
			this.velocity[1] = -PLAYER_SPEED;
			this.pos[1] += this.velocity[1];
			if (this.pos[1] < 10) // 10 for boundaries
				this.pos[1] = 10;
		}
	}

	move_down(game : any) {
		if (!this.move_read) {
			this.move_read = true;
			this.velocity[1] = PLAYER_SPEED;
			this.pos[1] += this.velocity[1];
			if (this.pos[1] + this.height > MAP_HEIGHT - 10) // -10 for boundaries
				this.pos[1] = MAP_HEIGHT - 10 - this.height;
		}
	}

	dash(direction : number) {
		if (!this.move_read) {
			this.move_read = true;
			if (direction == -1) {
				this.velocity[1] = PLAYER_SPEED * 3;
				this.pos[1] += this.velocity[1];
				if (this.pos[1] + this.height > MAP_HEIGHT - 10) // -10 for boundaries
					this.pos[1] = MAP_HEIGHT - 10 - this.height;
			}
			else {
				this.velocity[1] = -PLAYER_SPEED * 3;
				this.pos[1] += this.velocity[1];
				if (this.pos[1] < 10) // 10 for boundaries
					this.pos[1] = 10;
			}
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