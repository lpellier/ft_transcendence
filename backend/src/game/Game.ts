import * as consts from "./Consts"
import { Server } from "socket.io"
import { Player } from "./Player";
import { Pong } from "./Pong";
import * as utils from "./utils";

// const MAX_SPEED : number = 7;
// const acceleration : number = 7;
// const timeSpeedFactor : number = 0.000001;

const top_bound : number = 10;
const bot_bound : number = consts.MAP_HEIGHT - 10;
const left_bound : number = 0;
const right_bound : number = consts.MAP_WIDTH;

export class Game {
	room_id : any;
	state : string;
	score : [number, number];
	players : Player[];
	pong : Pong;
	framesSincePoint : number;
	publicity : string;
	intervalId : any;

	constructor(room_id: any) {
		this.room_id = room_id;
		this.state = 'waiting_room';
		this.players = [];
		this.score = [0, 0];
		this.pong = new Pong();
		this.framesSincePoint = 0;
		this.publicity = "public";
	}

	space_available() {

		return (this.players.length <= 1);
	}

	kick_player(server : Server, id: any) {
		for (let player of this.players) {
			if (player.id == id) {
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
		this.framesSincePoint = 0;
	}

	add_player(id: any) {
		for (let player of this.players)
			if (player.id == id)
				return ;
		if (this.players.length == 0)
			this.players.push(new Player("white", 1, id));
		else if (this.players.length == 1)
			this.players.push(new Player("white", 2, id));
	}

	// ? MAP BOUNDS :
	// ? top bound : 10
	// ? bottom bound : MAP_HEIGHT - 10
	// ? left bound : 0
	// ? right bound : MAP_WIDTH

	checkCollisions() {
		// Implement acceleration here
		if (this.framesSincePoint == 0)
			this.pong.speed = consts.PONG_BASE_SPEED;
		else if (this.pong.speed < consts.PONG_MAX_SPEED) {
			if (this.pong.velocity[0] > 0)
				this.pong.velocity[0] += 0.0025;
			else
				this.pong.velocity[0] -= 0.0025;
			if (this.pong.velocity[1] > 0)
				this.pong.velocity[1] += 0.0025;
			else
				this.pong.velocity[1] -= 0.0025;
			this.pong.speed += 0.005;
		}

		this.framesSincePoint++;

		// ? collision with bounds
		if (this.pong.velocity[1] > 0 && this.pong.pos[1] + this.pong.diameter > bot_bound) {
			this.pong.pos[1] = bot_bound - this.pong.diameter;
			this.pong.velocity[1] = -this.pong.velocity[1];
			return ;
		}
		else if (this.pong.velocity[1] < 0 && this.pong.pos[1] < top_bound) {
			this.pong.pos[1] = top_bound;
			this.pong.velocity[1] = -this.pong.velocity[1];
			return;
		}
		else if (this.pong.velocity[0] > 0 && this.pong.pos[0] + this.pong.diameter > right_bound) {
			this.pong.relaunchPong("right");
			this.score[0]++;
			this.framesSincePoint = 0;
			return ;
		}
		else if (this.pong.velocity[0] < 0 && this.pong.pos[0] < left_bound) {
			this.pong.relaunchPong("left");
			this.score[1]++;
			this.framesSincePoint = 0;
			return ;
		}
		
		// ? collision with paddles
		let angle : [boolean, number, string, string] = [false, 0, "x", "side"];
		if (this.pong.pos[0] < consts.MAP_WIDTH / 2)
			angle = this.collision_paddle(this.players[0], angle);
		else
			angle = this.collision_paddle(this.players[1], angle);
		
		if (angle[0] == true) {
			// ? for bot / top collisions
			if (angle[2] == "x") {
				if (angle[3] == "top")
					this.pong.velocity[1] = this.pong.speed * -Math.cos(angle[1]);
				else if (angle[3] == "bot")
					this.pong.velocity[1] = this.pong.speed * Math.cos(angle[1]);
				this.pong.velocity[0] = this.pong.speed * -Math.sin(angle[1]);
			}
			// ? invert velocity indexes for left / right collisions
			else if (angle[2] == "y") {
				if (this.pong.pos[0] < consts.MAP_WIDTH / 2)
					this.pong.velocity[0] = this.pong.speed * Math.cos(angle[1]);
				else
					this.pong.velocity[0] = this.pong.speed * -Math.cos(angle[1]);
				this.pong.velocity[1] = this.pong.speed * -Math.sin(angle[1]);	
			}
		}
	}

	collision_paddle(player : Player, angle : [boolean, number, string, string]) : [boolean, number, string, string] {
		let pong_points_hit : [[number, number], [number, number], [number, number]] =
			player.index == 1 ? [this.pong.left_up(), this.pong.left(), this.pong.left_down()] :
			[this.pong.right_up(), this.pong.right(), this.pong.right_down()];

		let paddle_side_hit : [[number, number], [number, number]] = player.index == 1 ? 
			[player.right_up(), player.right_down()] : [player.left_up(), player.left_down()];
	
		// ** CHECKING SIDE OF PADDLE ** //
		if (angle[0] == false)
			angle = utils.intersect(pong_points_hit[1],
				this.pong.ball_moves(pong_points_hit[1][0], pong_points_hit[1][1]),
				paddle_side_hit[0], paddle_side_hit[1], "y", "side");

		if (angle[0] == false)
			angle = utils.intersect(pong_points_hit[0],
				this.pong.ball_moves(pong_points_hit[0][0], pong_points_hit[0][1]),
				paddle_side_hit[0], paddle_side_hit[1], "y", "side");

		if (angle[0] == false)
			angle = utils.intersect(pong_points_hit[2],
				this.pong.ball_moves(pong_points_hit[2][0], pong_points_hit[2][1]),
				paddle_side_hit[0], paddle_side_hit[1], "y", "side");

		// ** CHECKING BOTTOM OF PADDLE ** //
		if (angle[0] == false)
			angle = utils.intersect(this.pong.up(),
				this.pong.ball_moves(this.pong.c_x(), this.pong.pos[1]),
				player.left_down(), player.right_down(), "x", "bot");

		if (angle[0] == false)
			angle = utils.intersect(this.pong.left_up(),
				this.pong.ball_moves(this.pong.pos[0], this.pong.pos[1]),
				player.left_down(), player.right_down(), "x", "bot");
		
		if (angle[0] == false)
			angle = utils.intersect(this.pong.right_up(),
				this.pong.ball_moves(this.pong.pos[0] + this.pong.diameter, this.pong.pos[1]),
				player.left_down(), player.right_down(), "x", "bot");

		// ** CHECKING TOP OF PADDLE ** //
		if (angle[0] == false)
			angle = utils.intersect(this.pong.down(),
				this.pong.ball_moves(this.pong.c_x(), this.pong.pos[1] + this.pong.diameter),
				player.left_up(), player.right_up(), "x", "top");
	
		if (angle[0] == false)
			angle = utils.intersect(this.pong.left_down(),
				this.pong.ball_moves(this.pong.pos[0], this.pong.pos[1] + this.pong.diameter),
				player.left_up(), player.right_up(), "x", "top");
		
		if (angle[0] == false)
			angle = utils.intersect(this.pong.right_down(),
				this.pong.ball_moves(this.pong.pos[0] + this.pong.diameter, this.pong.pos[1] + this.pong.diameter),
				player.left_up(), player.right_up(), "x", "top");
	
		return angle;
	}
};
