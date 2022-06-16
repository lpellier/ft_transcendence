import * as consts from "./Consts"
import { Server } from "socket.io"
import { Player } from "./Player";
import { Pong } from "./Pong";
import { GameMap } from "./GameMap";
import * as utils from "./utils";

const top_bound : number = 10;
const bot_bound : number = consts.MAP_HEIGHT - 10;
const left_bound : number = 0;
const right_bound : number = consts.MAP_WIDTH;

export class Game {
	room_id : string;
	state : string;
	score : [number, number];
	score_limit : number;
	players : Player[];
	pong : Pong;
	map : GameMap;
	frames_since_point : number;
	publicity : string;
	update_interval : any;
	ball_update_interval : any;

	constructor(room_id: any) {
		this.room_id = room_id;
		this.state = 'waiting_room';
		this.players = [];
		this.score = [0, 0];
		this.score_limit = 0;
		this.pong = new Pong();
		this.map = consts.original_map;
		this.frames_since_point = 0;
		this.publicity = "public";
	}

	spaceAvailable() {
		return (this.players.length <= 1);
	}

	kickPlayer(server : Server, id: any) {
		for (let player of this.players) {
			if (player.id === id) {
				server.to(this.room_id).emit("player-disconnect", this.players.indexOf(player));
				this.players.splice(this.players.indexOf(player), 1);
				this.reset();
			}
		}
	}

	reset() {
		for (let player of this.players)
			player.reset(this.players.length);
		this.state = "waiting_room";
		this.score = [0, 0];
		delete this.pong;
		this.pong = new Pong();
		this.frames_since_point = 0;
	}

	addPlayer(id: any) {
		for (let player of this.players)
			if (player.id === id)
				return ;
		if (this.players.length === 0)
			this.players.push(new Player("white", 1, id));
		else if (this.players.length === 1)
			this.players.push(new Player("white", 2, id));
	}

	setNewValue() {
		if (this.map.name != "casino")
			return ;
		this.pong.value = Math.floor(Math.random() * 4) + 1;
	}

	checkCollisions() : boolean {
		// Implement acceleration here
		if (this.frames_since_point === 0)
			this.pong.speed = consts.PONG_BASE_SPEED;
		else if (this.pong.speed < consts.PONG_MAX_SPEED) {
			if (this.pong.velocity[0] > 0)
				this.pong.velocity[0] += consts.PONG_ACCELERATION;
			else
				this.pong.velocity[0] -= consts.PONG_ACCELERATION;
			if (this.pong.velocity[1] > 0)
				this.pong.velocity[1] += consts.PONG_ACCELERATION;
			else
				this.pong.velocity[1] -= consts.PONG_ACCELERATION;
			this.pong.speed += consts.PONG_ACCELERATION * 2;
		}

		this.frames_since_point++;

		// ? collision with bounds
		for (const wall of this.map.walls) {
			let intersection : [number, number, string] = utils.getLineIntersection(this.pong.center(), this.pong.centerNextFrame(), wall[2], wall[3]);
			if (intersection[0] != -1) {
				this.pong.velocity[1] *= -1;
				return ;
			}
		}
		if (this.pong.velocity[0] > 0 && this.pong.pos[0] + this.pong.diameter > right_bound) {
			this.score[0] += this.pong.value;
			if (this.score[0] >= this.score_limit)
				return true;
			this.setNewValue();
			this.pong.relaunchPong("right");
			this.frames_since_point = 0;
			return false;
		}
		else if (this.pong.velocity[0] < 0 && this.pong.pos[0] < left_bound) {
			this.score[1] += this.pong.value;
			if (this.score[1] >= this.score_limit)
				return true;
			this.setNewValue();
			this.pong.relaunchPong("left");
			this.frames_since_point = 0;
			return false;
		}
		
		let player = (this.pong.pos[0] < consts.MAP_WIDTH / 2 ? this.players[0] : this.players[1]);

		// ? collision with paddles
		let angle : number = 0;
		let intersection_point : [number, number, string][] = [[-1, -1, "side"]]; // array of one element so that the variable is referenced in functions
		angle = this.collisionPaddle(player, intersection_point);
		
		if (intersection_point[0][0] != -1) {
			let max_angle_percentage : number = Math.abs(angle) / (Math.PI * 5 / 12); // ? number that lets me add speed to acute angled shots
			// ? for bot / top collisions
			if (intersection_point[0][2] === "top" || intersection_point[0][2] === "bot") {
				if (intersection_point[0][2] === "top")
					this.pong.velocity[1] = (1 + consts.PONG_ACCELERATION_ACUTE_ANGLE * max_angle_percentage) * this.pong.speed * -Math.cos(angle);
				else if (intersection_point[0][2] === "bot")
					this.pong.velocity[1] = (1 + consts.PONG_ACCELERATION_ACUTE_ANGLE * max_angle_percentage) * this.pong.speed * Math.cos(angle);
				this.pong.velocity[0] = (1 + consts.PONG_ACCELERATION_ACUTE_ANGLE * max_angle_percentage) * this.pong.speed * -Math.sin(angle);
			}
			// ? invert velocity indexes for left / right collisions
			else if (intersection_point[0][2] === "side") {
				if (this.pong.pos[0] < this.map.width / 2)
					this.pong.velocity[0] = (1 + consts.PONG_ACCELERATION_ACUTE_ANGLE * max_angle_percentage) * this.pong.speed * Math.cos(angle);
				else
					this.pong.velocity[0] = (1 + consts.PONG_ACCELERATION_ACUTE_ANGLE * max_angle_percentage) * this.pong.speed * -Math.cos(angle);
				this.pong.velocity[1] = (1 + consts.PONG_ACCELERATION_ACUTE_ANGLE * max_angle_percentage) * this.pong.speed * -Math.sin(angle);	
			}
		}
		return false;
	}

	collisionPaddle(player : Player, intersection_point : [number, number, string][]) : number {
		let paddle_side_hit :	[[number, number], [number, number]] = player.index === 1 ? 
								[player.rightUp(), player.rightDown()] : [player.leftUp(), player.leftDown()];
		let paddle_bot_hit : [[number, number], [number, number]] = [player.leftDown(), player.rightDown()];
		let paddle_top_hit : [[number, number], [number, number]] = [player.leftUp(), player.rightUp()];
		
		intersection_point[0] = utils.getLineIntersection(this.pong.center(), this.pong.centerNextFrame(), paddle_side_hit[0], paddle_side_hit[1]);
		intersection_point[0][2] = "side";
		if (intersection_point[0][0] != -1)
			return utils.relativeIntersection(intersection_point[0], paddle_side_hit[0], paddle_side_hit[1]);
	
		// ? Multiplying velocity vector by 3 for better precision in bot/top intersection
		intersection_point[0] = utils.getLineIntersection(this.pong.center(), [this.pong.cX() + this.pong.velocity[0] * 3, this.pong.cY() + this.pong.velocity[1] * 3], paddle_bot_hit[0], paddle_bot_hit[1]);
		intersection_point[0][2] = "bot";
		if (intersection_point[0][0] != -1)
			return utils.relativeIntersection(intersection_point[0], paddle_bot_hit[0], paddle_bot_hit[1]);
	
		intersection_point[0] = utils.getLineIntersection(this.pong.center(), [this.pong.cX() + this.pong.velocity[0] * 3, this.pong.cY() + this.pong.velocity[1] * 3], paddle_top_hit[0], paddle_top_hit[1]);
		intersection_point[0][2] = "top";
		if (intersection_point[0][0] != -1)
			return utils.relativeIntersection(intersection_point[0], paddle_top_hit[0], paddle_top_hit[1]);
		
		return 0;
	}
}