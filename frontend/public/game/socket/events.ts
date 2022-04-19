// function listen_start_events() {
// 	socket.on("waiting_room", (r_id : string) => {
// 		game.room_id = r_id;
// 		game.state = "waiting-player";
// 		errors.set_false();
// 		buttons.hide();
// 		inputs.join.hide()
	
// 		buttons.return.show();
// 	});

// 	socket.on("matchmaking-error", (error : string) => {
// 		errors.set_false();
// 		if (error == "game_full")
// 			errors.game_full = true;
// 		else if (error == "game_not_found")
// 			errors.game_not_found = true;	
// 	});

// 	socket.on("await_readiness", (id_p1 : string, id_p2 : string) => {
// 		if (game.players.length == 0) {
// 			game.state = "waiting-readiness"
// 			if (socket.id == id_p1) {
// 				game.players.push(new Player(MAP_WIDTH / 12, MAP_HEIGHT / 2 - PLAYER_HEIGHT / 2, PLAYER_WIDTH, PLAYER_HEIGHT, "white", 1, id_p1));
// 				game.players.push(new Player(MAP_WIDTH * 11 / 12, MAP_HEIGHT / 2 - PLAYER_HEIGHT / 2, PLAYER_WIDTH, PLAYER_HEIGHT, "white", 2, id_p2));
// 				console.log("i'm player 1");
// 			}
// 			else if (socket.id == id_p2) {
// 				game.players.push(new Player(MAP_WIDTH * 11 / 12, MAP_HEIGHT / 2 - PLAYER_HEIGHT / 2, PLAYER_WIDTH, PLAYER_HEIGHT, "white", 2, id_p2));
// 				game.players.push(new Player(MAP_WIDTH / 12, MAP_HEIGHT / 2 - PLAYER_HEIGHT / 2, PLAYER_WIDTH, PLAYER_HEIGHT, "white", 1, id_p1));
// 				console.log("i'm player 2");
// 			}
// 			game.pong = new Pong;
// 		}
// 	});
	
// 	socket.on("countdown-server", () => {
// 		if (game.state == "countdown") {
// 			game.timer--;
// 			if (game.timer == -1)
// 				game.state = "in-game";
// 		}
// 	});
// }

// function listen_stop_events() {
// 	socket.on("player-disconnect", (index : number) => {
// 		in_main_menu();
// 		game.players = [];
// 		game.timer = 3;
// 		game.state = "in-menu"; // "your opponent left menu"
// 		game.score = [0, 0];
// 	});

// 	socket.on("restart-server", () => {
// 		game.timer = 3;
// 		game.state = "in-game";
// 		game.score = [0, 0];
// 	})
// }

// function listen_move_events() {
// 	socket.on("switch_readiness-server", (id : string) => {
// 		let count = 0;
// 		for (let player of game.players) {
// 			if (player.id == id)
// 				player.ready = !player.ready;
// 			if (player.ready)
// 				count++;
// 		}
// 		if (count == game.players.length) {
// 			game.state = "countdown";
// 			socket.emit("countdown_start");
// 		}
// 	});

// 	socket.on("updated_pos", (pong_pos : [number, number], p1_id : string, p1_pos : [number, number], p2_id : string, p2_pos : [number, number], score : [number, number]) => {
// 		game.pong.pos = pong_pos;
// 		if (p1_id == socket.id) {
// 			game.players[0].pos = p1_pos;
// 			game.players[1].pos = p2_pos;
// 			game.score = score;
// 		}
// 		else if (p2_id == socket.id) {
// 			game.players[0].pos = p2_pos;
// 			game.players[1].pos = p1_pos;
// 			game.score = score;
// 		}
// 	});
// }

