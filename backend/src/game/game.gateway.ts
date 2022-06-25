import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket, Server } from "socket.io";
import { Game } from "./classes/Game"
import * as consts from "./classes/Consts"
import * as utils from "./utils"
import { GameService } from "./game.service"


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
		if (game.players.length === 2 && game.state === "waiting-player") {
			game.state = "waiting-readiness";
			server.to(game.room_id).emit("waiting-readiness", game.players[0].id, game.players[1].id);
		}
	}
}

@WebSocketGateway({
	cors: {
		origin: "http://127.0.0.1:3000"
	}
})
export class GameGateway {
	constructor(private readonly game_service: GameService) {}
	@WebSocketServer()
	server: Server;

	clients : string[] = [];
	users : [string, string][] = [];
	games : Game[] = [];

	timestep : number = 15; // ms

	handleDisconnect(client : Socket) {
		let index = -1;
		if ((index = this.clients.indexOf(client.id)) != -1) {
			this.clients.splice(index, 1);
			this.users.splice(index, 1);
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
	getConnection(@MessageBody() data : [string, string, string]) {
		this.clients.push(data[0]);
		this.users.push([data[1], data[2]]);
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
		existing_game.addPlayer(client.id, this.users[this.clients.indexOf(client.id)]);
		this.server.to(existing_game.room_id).emit("waiting-player", existing_game.room_id, existing_game.score_limit, existing_game.map.name);
		startGameFullRooms(this.games, this.server);
	}

	// ? if user is searching for a specific room
	@SubscribeMessage('find_game')
	handleJoinGame(
		@ConnectedSocket() client : Socket,
		@MessageBody() data : [string, boolean] // room_id, spectator
	) {
		let found : boolean = false;
		for (let game of this.games) {
			if (game.room_id === data[0]) {
				found = true;
				if (data[1] === true) {
					client.join(game.room_id);
					game.addSpectator(client.id);
					this.server.to(client.id).emit("spectate", game.room_id, game.score_limit, game.map.name, game.state, game.players[0].id, (game.players.length > 1 ? game.players[1].id : "null")); // need to handle case where only one user is connected
				}
				else if (game.players.length < 2) {
					client.join(game.room_id);
					game.addPlayer(client.id, this.users[this.clients.indexOf(client.id)]);
					this.server.to(game.room_id).emit("waiting-player", game.room_id, game.score_limit, game.map.name);
					game.state = "waiting-readiness";
					this.server.to(game.room_id).emit("waiting-readiness", game.players[0].id, game.players[1].id);						
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
				if (player.id === client.id && game.state === "waiting-readiness") {
					if (game.players[0].ready && game.players[1].ready) {
						game.state = "in-game"
						let test = this.server;
						for (let i = 1; i < 5; i++) {
							setTimeout(() => {
								this.server.to(game.room_id).emit("countdown-server");
								if (i === 4) {
									game.update_interval = setInterval(() => {
										if (game.pong.calculateNewPos(game, this.server)) {
											test.to(game.room_id).emit("game-over");
											clearInterval(game.update_interval);
											clearInterval(game.ball_update_interval);
											var w_id, l_id;
											if (game.score[0] > game.score[1]) {
												w_id = game.players[0].real_id;
												l_id = game.players[1].real_id;
											}
											else {
												w_id = game.players[1].real_id;
												l_id = game.players[0].real_id;
											}
											this.game_service.incrementVictories(w_id);
											this.game_service.incrementLosses(l_id);
											this.game_service.createMatch({ladder: 0, winnerId : w_id, loserId: l_id});
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
			if (game.players.length === 2 && game.state === "in-game") {
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
			if (game.players.length === 2 && game.state === "in-game") {
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
			if (game.players.length === 2 && game.state === "in-game") {
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
