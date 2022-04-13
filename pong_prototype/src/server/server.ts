import * as express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import * as path from "path"

// ? Important
// TODO find whatever the fuck is wrong with collisions

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

export const MAP_WIDTH = 750;
export const MAP_HEIGHT = 500;

import { Game } from "./Game";
import * as utils from "./utils";

const PORT = 3000;

export let g_io : any;
let g_app : any;
let g_server : any;

let g_games : Game[] = [];
let g_clients : any[] = [];

/**
 * @brief sets up express server configured on given port
 * @brief /public/index.html is the file served as the homepage
 */
function setup_server() {
	g_app = express();
	g_app.use(express.static('public'));
	
	g_server = createServer(g_app);
	g_io = new Server(g_server, {});
	
	g_server.listen(PORT, () => {
		console.log("listening on port 3000...");
	});
	
	// serve the homepage
	g_app.get('/', (req : any, res : any) => {
		res.sendFile(path.resolve(__dirname + '/public/index.html'));
	});
}

/**
 * @returns game if one with 1 or less players in it
 * @returns null otherwise
 */
function existing_empty_game() : Game {
	for (const game of g_games) {
		if (game.space_available() && game.publicity == "public") // should check if game accepts friends and if user is one
			return game;
	}
	return null;
}

/**
 * loops over every game and sends a signal to ask for players's readiness
 */
function start_game_full_rooms() {
	// starts every game that has 2 players after a connection
	for (const game of g_games) {
		if (game.players.length == 2 && game.state == "waiting_room") {
			game.state = "await_readiness";
			g_io.to(game.room_id).emit("await_readiness", game.players[0].id, game.players[1].id);
		}
	}
}

function listen_connect(socket : any) {
	console.log("a user connected");
	g_clients.push(socket);
	console.log(g_clients.length + " clients are currently connected");
	
	socket.on("matchmaking", (publicity : string, matchmaking : boolean) => {
		let existing_game : any;
		if (publicity == "public" && matchmaking)
			existing_game = existing_empty_game();

		if (existing_game == null) {
			g_games.push(new Game(utils.random_room_id()));
			existing_game = g_games[g_games.length - 1];
		}
		existing_game.publicity = publicity;
		socket.join(existing_game.room_id);
		existing_game.add_player(socket.id);
		g_io.to(existing_game.room_id).emit("waiting_room", existing_game.room_id);
		start_game_full_rooms();
	});

	// ? if user is searching for a specific room
	socket.on("find_game", (room_id : string) => {
		let found : boolean = false;
		for (let game of g_games) {
			if (game.room_id == room_id) {
				found = true;
				if (game.players.length < 2) {
					socket.join(game.room_id);
					game.add_player(socket.id);
					g_io.to(game.room_id).emit("waiting_room", game.room_id);
					game.state = "await_readiness";
					g_io.to(game.room_id).emit("await_readiness", game.players[0].id, game.players[1].id);						
				}
				else
					g_io.to(socket.id).emit("matchmaking-error", "game_full");
			}
		}
		if (!found)
			g_io.to(socket.id).emit("matchmaking-error", "game_not_found");
	});
}

function listen_disconnect(socket : any) {
	socket.on("disconnect", () => {
		g_clients.splice(g_clients.indexOf(socket), 1);
		for (let game of g_games) {
			for (let player of game.players) {
				if (player.id == socket.id) {
					g_io.to(game.room_id).emit("player-disconnect");
					g_games.splice(g_games.indexOf(game), 1);
				}
			}
		}
		console.log("a user disconnected");
		console.log(g_clients.length + " clients are currently connected");
		console.log(g_games);
	});

	socket.on("quit", () => {
		for (let game of g_games) {
			for (let player of game.players) {
				if (player.id == socket.id) {
					g_io.to(game.room_id).emit("player-disconnect");
					g_games.splice(g_games.indexOf(game), 1);
				}
			}
		}
	});
}

function listen_gamestart(socket: any) {
	socket.on("countdown_start", () => {
		for (let game of g_games) {
			for (const player of game.players) {
				if (player.id == socket.id && game.state == "await_readiness") {
					if (game.players[0].ready && game.players[1].ready) {
						game.state = "game_started"
						for (let i = 1; i < 5; i++) {
							setTimeout(() => {
									g_io.to(game.room_id).emit("countdown-server");
							}, i * 1000);
						}
					}
				}
			}
		}
	});

	socket.on("restart_game", (room_id : string) => {
		for (let game of g_games) {
			if (game.room_id == room_id) {
				game.score = [0, 0];
				game.pong.relaunchPong("left");
				game.framesSincePoint = 0;
				g_io.to(room_id).emit("restart-server");
			}
		}
	});
}

function listen_moves(socket : any) {
	socket.on("switch_readiness", (id : any) => {
		for (const game of g_games) {
			for (const player of game.players) {
				if (player.id == id) {
					player.ready = !player.ready;
					g_io.to(game.room_id).emit("switch_readiness-server", id);
					break;
				}
			}
		}
	});

	socket.on("move_up", (id : any) => {
		for (const game of g_games) {
			if (game.players.length == 2 && game.state == "game_started") {
				for (const player of game.players) {
					if (player.id == id) {
						player.move_up(game);
						if (game.players[0].move_read && game.players[1].move_read) {
							game.players[0].move_read = false;
							game.players[1].move_read = false;
							game.pong.calculateNewPos();
							game.checkCollisions();
							g_io.to(game.room_id).emit("updated_pos", game.pong.pos, game.players[0].id, game.players[0].pos, game.players[1].id, game.players[1].pos, game.score);
						}
						break;
					}
				}
			}
		}
	});

	socket.on("move_down", (id : any) => {
		for (const game of g_games) {
			if (game.players.length == 2 && game.state == "game_started") {
				for (const player of game.players) {
					if (player.id == id) {
						player.move_down(game);
						if (game.players[0].move_read && game.players[1].move_read) {
							game.players[0].move_read = false;
							game.players[1].move_read = false;
							game.pong.calculateNewPos();
							game.checkCollisions();
							g_io.to(game.room_id).emit("updated_pos", game.pong.pos, game.players[0].id, game.players[0].pos, game.players[1].id, game.players[1].pos, game.score);
						}
						break;
					}
				}
			}
		}
	});

	// ? Dash implementation
	socket.on("dash", (id : any, direction : number) => {
		for (const game of g_games) {
			if (game.players.length == 2 && game.state == "game_started") {
				for (const player of game.players) {
					if (player.id == id) {
						player.dash(direction);
						if (game.players[0].move_read && game.players[1].move_read) {
							game.players[0].move_read = false;
							game.players[1].move_read = false;
							game.pong.calculateNewPos();
							game.checkCollisions();
							g_io.to(game.room_id).emit("updated_pos", game.pong.pos, game.players[0].id, game.players[0].pos, game.players[1].id, game.players[1].pos, game.score);
						}
						break;
					}
				}
			}
		}
	});

	socket.on("do_nothing", (id : any) => {
		for (const game of g_games) {
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
							g_io.to(game.room_id).emit("updated_pos", game.pong.pos, game.players[0].id, game.players[0].pos, game.players[1].id, game.players[1].pos, game.score);
						}
						break;
					}
				}
			}
		}
	});
}

function listen_events() {
	g_io.on("connect", (socket: any) => {
		listen_connect(socket);
		listen_disconnect(socket);
		listen_gamestart(socket);
		listen_moves(socket);
	});
}

setup_server();
listen_events();
