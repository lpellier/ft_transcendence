import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket, Server } from "socket.io";
import { Game } from "./Game"
import * as utils from "./utils"

// ? Important
// TODO find whatever the fuck is wrong with collisions
// TODO reduce lag -> maybe return of subscribemessage

// ? Not important
// TODO Finish or remove dash ability
// TODO your opponent left menu

// TODO adding options and probably sounds

// TODO server should send constants like map width and height itself in case of changing things
// TODO Games should have map heights and width constants in their class, because it might be different for other people

// ? Maybe but probably no
// TODO windjammers remake ?
// TODO players can move horizontally (?)

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
 function existing_empty_game(games : Game[]) : Game {
	for (const game of games) {
		if (game.space_available() && game.publicity == "public") // should check if game accepts friends and if user is one
			return game;
	}
	return null;
}

/**
 * loops over every game and sends a signal to ask for players's readiness
 */
 function start_game_full_rooms(games : Game[], server : Server) {
	// starts every game that has 2 players after a connection
	for (const game of games) {
		if (game.players.length == 2 && game.state == "waiting_room") {
			game.state = "await_readiness";
			server.to(game.room_id).emit("await_readiness", game.players[0].id, game.players[1].id);
		}
	}
}

@WebSocketGateway({
	cors: {
		origin: "http://localhost:3000"
	}
})
export class GameGateway {
	@WebSocketServer()
	server: Server;

	clients : string[] = [];
	games : Game[] = [];

	handleDisconnect(client : Socket) {
		let index = -1;
		if ((index = this.clients.indexOf(client.id)) != -1) {
			this.clients.splice(index, 1);
			for (let game of this.games) {
				for (const player of game.players) {
					if (player.id == client.id) {
						this.server.to(game.room_id).emit("player-disconnect");
						this.games.splice(this.games.indexOf(game), 1);
					}
				}
			}
			console.log(client.id, "just disconnected -", this.clients.length, "users total");
		}
	}

	@SubscribeMessage("test")
	handleTest() {
		return "letsgo";
	}

	@SubscribeMessage("quit")
	handleQuit(@ConnectedSocket() client : Socket) {
		for (let game of this.games) {
			for (let player of game.players) {
				if (player.id == client.id) {
					this.server.to(game.room_id).emit("player-disconnect");
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
		console.log(client_id, "just connected    -", this.clients.length, "users total");
	}

	@SubscribeMessage('matchmaking')
	handleMatchmaking(
		@ConnectedSocket() client : Socket,
		@MessageBody() data : [string, boolean]
	) {
		let existing_game : Game;
		if (data[0] == "public" && data[1])
			existing_game = existing_empty_game(this.games);
		
		if (existing_game == null) {
			this.games.push(new Game(utils.random_room_id()));
			existing_game = this.games[this.games.length - 1];
		}
		existing_game.publicity = data[0];
		client.join(existing_game.room_id);
		existing_game.add_player(client.id);
		this.server.to(existing_game.room_id).emit("waiting_room", existing_game.room_id);
		start_game_full_rooms(this.games, this.server);
	}

	// ? if user is searching for a specific room
	@SubscribeMessage('find_game')
	handleJoinGame(
		@ConnectedSocket() client : Socket,
		@MessageBody() room_id : string
	) {
		let found : boolean = false;
		for (let game of this.games) {
			if (game.room_id == room_id) {
				found = true;
				if (game.players.length < 2) {
					client.join(game.room_id);
					game.add_player(client.id);
					this.server.to(game.room_id).emit("waiting_room", game.room_id);
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
				if (player.id == client.id && game.state == "await_readiness") {
					if (game.players[0].ready && game.players[1].ready) {
						game.state = "game_started"
						for (let i = 1; i < 5; i++) {
							setTimeout(() => {
									this.server.to(game.room_id).emit("countdown-server");
							}, i * 1000);
						}
					}
				}
			}
		}
	}

	@SubscribeMessage("restart_game")
	handleRestart(@MessageBody() room_id : string) {
		for (let game of this.games) {
			if (game.room_id == room_id) {
				game.score = [0, 0];
				game.pong.relaunchPong("left");
				game.framesSincePoint = 0;
				this.server.to(room_id).emit("restart-server");
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
				if (player.id == client_id) {
					player.ready = !player.ready;
					this.server.to(game.room_id).emit("switch_readiness-server", client_id);
					break;
				}
			}
		}
	}

	@SubscribeMessage("move_up")
	handleMoveUp(@MessageBody() client_id : string) {
		for (const game of this.games) {
			if (game.players.length == 2 && game.state == "game_started") {
				for (const player of game.players) {
					if (player.id == client_id) {
						player.move_up(game);
						if (game.players[0].move_read && game.players[1].move_read) {
							game.players[0].move_read = false;
							game.players[1].move_read = false;
							game.pong.calculateNewPos();
							game.checkCollisions();
							this.server.to(game.room_id).emit("updated_pos", game.pong.pos, game.players[0].id, game.players[0].pos, game.players[1].id, game.players[1].pos, game.score);
						}
						break;
					}
				}
			}
		}
	}

	@SubscribeMessage("move_down")
	handleMoveDown(@MessageBody() client_id : string) {
		for (const game of this.games) {
			if (game.players.length == 2 && game.state == "game_started") {
				for (const player of game.players) {
					if (player.id == client_id) {
						player.move_down(game);
						if (game.players[0].move_read && game.players[1].move_read) {
							game.players[0].move_read = false;
							game.players[1].move_read = false;
							game.pong.calculateNewPos();
							game.checkCollisions();
							this.server.to(game.room_id).emit("updated_pos", game.pong.pos, game.players[0].id, game.players[0].pos, game.players[1].id, game.players[1].pos, game.score);
						}
						break;
					}
				}
			}
		}
	}

	// ? Dash implementation
	@SubscribeMessage("dash")
	handleDash(@MessageBody() data : [string, number]) {
		for (const game of this.games) {
			if (game.players.length == 2 && game.state == "game_started") {
				for (const player of game.players) {
					if (player.id == data[0]) {
						player.dash(data[1]);
						if (game.players[0].move_read && game.players[1].move_read) {
							game.players[0].move_read = false;
							game.players[1].move_read = false;
							game.pong.calculateNewPos();
							game.checkCollisions();
							this.server.to(game.room_id).emit("updated_pos", game.pong.pos, game.players[0].id, game.players[0].pos, game.players[1].id, game.players[1].pos, game.score);
						}
						break;
					}
				}
			}
		}
	}

	@SubscribeMessage("do_nothing")
	handleNothing(@MessageBody() id : string) {
		for (const game of this.games) {
			if (game.players.length == 2 && game.state == "game_started") {
				for (const player of game.players) {
					if (player.id == id) {
						if (!player.move_read)
							player.move_read = true;
						if (game.players[0].move_read && game.players[1].move_read) {
							game.players[0].move_read = false;
							game.players[1].move_read = false;
							game.pong.calculateNewPos();
							game.checkCollisions();
							this.server.to(game.room_id).emit("updated_pos", game.pong.pos, game.players[0].id, game.players[0].pos, game.players[1].id, game.players[1].pos, game.score);
						}
						break;
					}
				}
			}
		}
	}
}
