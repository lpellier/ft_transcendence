import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket, Server } from "socket.io";
import { Game } from "./Game"
import * as consts from "./Consts"
import * as utils from "./utils"

// ? How to create a game of pong
// ? First, server sends page to which clients can connect
// ? clients connected are separeted into rooms, there can only be two clients per room
// ? while a client waits for another one to show up, waiting screen
// ? once two clients are connected, server tells clients to output readiness confirmation
// ? everytime a client presses space, it sends a signal to the server to switch its readiness
// ? whenever server sees that two clients are ready, it will start a countdown from 3
// ? and send a signal to both clients after each second so that their clocks are coordinated
// ? when countdown arrives to 0, start the game by throwing the pong to one of the players at random
// ? every single movement is processed by the server

// ** This all happens in one frame ** //
// ? the pong is fully calculated on server
// ? the movements of players are sent as input to server which checks if they are correct
// ? once server decides everything is fine, send pos of pong and players to both clients
// ? clients draw whatever pos they're given
// ? whenever a pong hits one of the left/right edges, a point is given to the opposing player

/**
 * @returns game if one with 1 or less players in it
 * @returns null otherwise
 */
 function existingEmptyGame(games : Game[]) : Game {
	for (const game of games) {
		if (game.spaceAvailable() && game.publicity === "public") // should check if game accepts friends and if user is one
			return game;
	}
	return null;
}

/**
 * loops over every game and sends a signal to ask for players's readiness
 */
 function startGameFullRooms(games : Game[], server : Server) {
	// starts every game that has 2 players after a connection
	for (const game of games) {
		if (game.players.length === 2 && game.state === "waiting_room") {
			game.state = "await_readiness";
			server.to(game.room_id).emit("await_readiness", game.players[0].id, game.players[1].id);
		}
	}
}

@WebSocketGateway({
	cors: {
		origin: "http://127.0.0.1:3000"
	}
})
export class GameGateway {
	@WebSocketServer()
	server: Server;

	clients : string[] = [];
	games : Game[] = [];

	timestep : number = 20; // ms

	handleDisconnect(client : Socket) {
		let index = -1;
		if ((index = this.clients.indexOf(client.id)) != -1) {
			this.clients.splice(index, 1);
			for (let game of this.games) {
				for (const player of game.players) {
					if (player.id === client.id) {
						this.server.to(game.room_id).emit("player-disconnect");
						clearInterval(game.update_interval);
						clearInterval(game.ball_update_interval);
						this.games.splice(this.games.indexOf(game), 1);
						return ;
					}
				}
			}
		}
	}

	@SubscribeMessage("quit-ongoing-game")
	handleQuitOngoing(@ConnectedSocket() client : Socket) {
		for (let game of this.games) {
			for (let player of game.players) {
				if (player.id === client.id) {
					this.server.to(game.room_id).emit("player-disconnect");
					clearInterval(game.update_interval);
					clearInterval(game.ball_update_interval);
					this.games.splice(this.games.indexOf(game), 1);
					return ;
				}
			}
		}
	}
	@SubscribeMessage("quit-own-game")
	handleQuitOwn(@ConnectedSocket() client : Socket) {
		for (let game of this.games) {
			for (let player of game.players) {
				if (player.id === client.id) {
					clearInterval(game.update_interval);
					clearInterval(game.ball_update_interval);
					this.games.splice(this.games.indexOf(game), 1);
					return ;
				}
			}
		}
	}

	// ? acts as handleConnection because when calling handleConnection, multiple sockets seem to connect
	@SubscribeMessage('my_id')
	getConnection(@MessageBody() client_id : string) {
		this.clients.push(client_id);
		// console.log(client_id, "just connected    -", this.clients.length, this.clients.length === 1 ? "user  total" : "users total");
	}

	@SubscribeMessage('matchmaking')
	handleMatchmaking(
		@ConnectedSocket() client : Socket,
		@MessageBody() data : [string, boolean, number, string]
	) {
		let existing_game : Game = null;
		if (data[0] === "public" && data[1])
			existing_game = existingEmptyGame(this.games);
		
		if (existing_game === null) {
			this.games.push(new Game(utils.randomRoomId()));
			existing_game = this.games[this.games.length - 1];
		}
		existing_game.publicity = data[0];
		if (existing_game.score_limit === 0)
			existing_game.score_limit = data[2];
		if (data[3] === "city")
			existing_game.map = consts.city_map;
		else if (data[3] === "casino")
			existing_game.map = consts.casino_map;
		client.join(existing_game.room_id);
		existing_game.addPlayer(client.id);
		this.server.to(existing_game.room_id).emit("waiting_room", existing_game.room_id, existing_game.score_limit, existing_game.map.name);
		startGameFullRooms(this.games, this.server);
	}

	// ? if user is searching for a specific room
	@SubscribeMessage('find_game')
	handleJoinGame(
		@ConnectedSocket() client : Socket,
		@MessageBody() room_id : string
	) {
		let found : boolean = false;
		for (let game of this.games) {
			if (game.room_id === room_id) {
				found = true;
				if (game.players.length < 2) {
					client.join(game.room_id);
					game.addPlayer(client.id);
					this.server.to(game.room_id).emit("waiting_room", game.room_id, game.score_limit, game.map.name);
					game.state = "await_readiness";
					this.server.to(game.room_id).emit("await_readiness", game.players[0].id, game.players[1].id);						
				}
				else
					this.server.to(client.id).emit("matchmaking-error", "game_full");
			}
		}
		if (!found)
			this.server.to(client.id).emit("matchmaking-error", "game_not_found");
	}

	@SubscribeMessage("countdown_start")
	handleCountdown(@ConnectedSocket() client : Socket) {
		for (let game of this.games) {
			for (const player of game.players) {
				if (player.id === client.id && game.state === "await_readiness") {
					if (game.players[0].ready && game.players[1].ready) {
						game.state = "game_started"
						let test = this.server;
						for (let i = 1; i < 5; i++) {
							setTimeout(() => {
								this.server.to(game.room_id).emit("countdown-server");
								if (i === 4) {
									game.update_interval = setInterval(() => {
										if (game.pong.calculateNewPos(game)) {
											test.to(game.room_id).emit("game-over");
											clearInterval(game.update_interval);
											clearInterval(game.ball_update_interval);
											this.games.splice(this.games.indexOf(game), 1);
											return ;
										}
										test.to(game.room_id).emit("updated_pos",
											game.pong.pos,
											[game.players[0].id, game.players[0].pos],
											[game.players[1].id, game.players[1].pos],
											game.score, game.pong.value);
									}, this.timestep);
								}
							}, i * 1000);
						}
						return ;
					}
				}
			}
		}
	}

	@SubscribeMessage("switch_readiness")
	handleSwitchReadiness(
		@ConnectedSocket() client : Socket,
		@MessageBody() client_id : string
	) {
		for (const game of this.games) {
			for (const player of game.players) {
				if (player.id === client_id) {
					player.ready = !player.ready;
					this.server.to(game.room_id).emit("switch_readiness-server", client_id);
					return ;
				}
			}
		}
	}

	@SubscribeMessage("move_up")
	handleMoveUp(@MessageBody() client_id : string) {
		for (const game of this.games) {
			if (game.players.length === 2 && game.state === "game_started") {
				for (const player of game.players) {
					if (player.id === client_id) {
						player.moveUp();
						return ;
					}
				}
			}
		}
	}

	@SubscribeMessage("move_down")
	handleMoveDown(@MessageBody() client_id : string) {
		for (const game of this.games) {
			if (game.players.length === 2 && game.state === "game_started") {
				for (const player of game.players) {
					if (player.id === client_id) {
						player.moveDown();
						return ;
					}
				}
			}
		}
	}

	@SubscribeMessage("move_null")
	handleMoveNull(@MessageBody() client_id : string) {
		for (const game of this.games) {
			if (game.players.length === 2 && game.state === "game_started") {
				for (const player of game.players) {
					if (player.id === client_id) {
						player.velocity[1] = 0;
						return ;
					}
				}
			}
		}
	}
}
