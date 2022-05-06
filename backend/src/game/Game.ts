import * as consts from "./Consts"
import { Server } from "socket.io"
import { Player } from "./Player";
import { Pong } from "./Pong";
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

	// ? MAP BOUNDS :
	// ? top bound : 10
	// ? bottom bound : MAP_HEIGHT - 10
	// ? left bound : 0
	// ? right bound : MAP_WIDTH

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
		if (this.pong.velocity[1] > 0 && this.pong.pos[1] + this.pong.diameter > bot_bound) {
			this.pong.pos[1] = bot_bound - this.pong.diameter;
			this.pong.velocity[1] = -this.pong.velocity[1];
			return false;
		}
		else if (this.pong.velocity[1] < 0 && this.pong.pos[1] < top_bound) {
			this.pong.pos[1] = top_bound;
			this.pong.velocity[1] = -this.pong.velocity[1];
			return false;
		}
		else if (this.pong.velocity[0] > 0 && this.pong.pos[0] + this.pong.diameter > right_bound) {
			this.pong.relaunchPong("right");
			this.score[0]++;
			if (this.score[0] >= this.score_limit)
				return true;
			this.frames_since_point = 0;
			return false;
		}
		else if (this.pong.velocity[0] < 0 && this.pong.pos[0] < left_bound) {
			this.pong.relaunchPong("left");
			this.score[1]++;
			if (this.score[1] >= this.score_limit)
				return true;
			this.frames_since_point = 0;
			return false;
		}
		
		let player = (this.pong.pos[0] < consts.MAP_WIDTH / 2 ? this.players[0] : this.players[1]);

		if (player.distanceTo(this.pong.pos) > 50)
			return false;

		// ? collision with paddles
		let angle : [boolean, number, string, string] = [false, 0, "x", "side"];
		angle = this.collisionPaddle(player, angle);

		if (angle[0] === true) {
			let max_angle_percentage : number = Math.abs(angle[1]) / (Math.PI * 5 / 12); // ? number that lets me add speed to acute angled shots
			// ? for bot / top collisions
			if (angle[2] === "x") {
				if (angle[3] === "top")
					this.pong.velocity[1] = (1 + consts.PONG_ACCELERATION_ACUTE_ANGLE * max_angle_percentage) * this.pong.speed * -Math.cos(angle[1]);
				else if (angle[3] === "bot")
					this.pong.velocity[1] = (1 + consts.PONG_ACCELERATION_ACUTE_ANGLE * max_angle_percentage) * this.pong.speed * Math.cos(angle[1]);
				this.pong.velocity[0] = (1 + consts.PONG_ACCELERATION_ACUTE_ANGLE * max_angle_percentage) * this.pong.speed * -Math.sin(angle[1]);
			}
			// ? invert velocity indexes for left / right collisions
			else if (angle[2] === "y") {
				if (this.pong.pos[0] < consts.MAP_WIDTH / 2)
					this.pong.velocity[0] = (1 + consts.PONG_ACCELERATION_ACUTE_ANGLE * max_angle_percentage) * this.pong.speed * Math.cos(angle[1]);
				else
					this.pong.velocity[0] = (1 + consts.PONG_ACCELERATION_ACUTE_ANGLE * max_angle_percentage) * this.pong.speed * -Math.cos(angle[1]);
				this.pong.velocity[1] = (1 + consts.PONG_ACCELERATION_ACUTE_ANGLE * max_angle_percentage) * this.pong.speed * -Math.sin(angle[1]);	
			}
		}
		return false;
	}

	collisionPaddle(player : Player, angle : [boolean, number, string, string]) : [boolean, number, string, string] {
		let pong_points_hit : [[number, number], [number, number], [number, number]] =
			player.index === 1 ? [this.pong.leftUp(), this.pong.left(), this.pong.leftDown()] :
			[this.pong.rightUp(), this.pong.right(), this.pong.rightDown()];

		let paddle_side_hit : [[number, number], [number, number]] = player.index === 1 ? 
			[player.rightUp(), player.rightDown()] : [player.leftUp(), player.leftDown()];
	
		// ** CHECKING SIDE OF PADDLE ** //
		if (angle[0] === false)
			angle = utils.intersect(pong_points_hit[1],
				this.pong.ballMoves(pong_points_hit[1]),
				paddle_side_hit[0], paddle_side_hit[1], "y", "side");

		if (angle[0] === false)
			angle = utils.intersect(pong_points_hit[0],
				this.pong.ballMoves(pong_points_hit[0]),
				paddle_side_hit[0], paddle_side_hit[1], "y", "side");

		if (angle[0] === false)
			angle = utils.intersect(pong_points_hit[2],
				this.pong.ballMoves(pong_points_hit[2]),
				paddle_side_hit[0], paddle_side_hit[1], "y", "side");

		// ** CHECKING BOTTOM OF PADDLE ** //
		if (angle[0] === false)
			angle = utils.intersect(this.pong.up(),
				this.pong.ballMoves(this.pong.up()),
				player.leftDown(), player.rightDown(), "x", "bot");

		if (angle[0] === false)
			angle = utils.intersect(this.pong.leftUp(),
				this.pong.ballMoves(this.pong.leftUp()),
				player.leftDown(), player.rightDown(), "x", "bot");
		
		if (angle[0] === false)
			angle = utils.intersect(this.pong.rightUp(),
				this.pong.ballMoves(this.pong.rightUp()),
				player.leftDown(), player.rightDown(), "x", "bot");

		// ** CHECKING TOP OF PADDLE ** //
		if (angle[0] === false)
			angle = utils.intersect(this.pong.down(),
				this.pong.ballMoves(this.pong.down()),
				player.leftUp(), player.rightUp(), "x", "top");
	
		if (angle[0] === false)
			angle = utils.intersect(this.pong.leftDown(),
				this.pong.ballMoves(this.pong.leftDown()),
				player.leftUp(), player.rightUp(), "x", "top");
		
		if (angle[0] === false)
			angle = utils.intersect(this.pong.rightDown(),
				this.pong.ballMoves(this.pong.rightDown()),
				player.leftUp(), player.rightUp(), "x", "top");
	
		return angle;
	}
};
