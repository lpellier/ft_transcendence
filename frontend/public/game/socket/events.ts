function listen_start_events() {
	socket.on("waiting_room", (r_id : string) => {
		game.room_id = r_id;
		game.state = "waiting-player";
		errors.set_false();
		buttons.hide();
		inputs.hide()
	
		buttons.return.show();
	});

	socket.on("matchmaking-error", (error : string) => {
		errors.set_false();
		if (error == "game_full")
			errors.game_full = true;
		else if (error == "game_not_found")
			errors.game_not_found = true;	
	});

	socket.on("await_readiness", (id_p1 : string, id_p2 : string) => {
		if (game.players.length == 0) {
			game.state = "waiting-readiness"
			if (socket.id == id_p1) {
				game.players.push(new Player(consts.MAP_WIDTH / 12, consts.MAP_HEIGHT / 2 - consts.PLAYER_HEIGHT / 2, consts.PLAYER_WIDTH, consts.PLAYER_HEIGHT, "white", 1, id_p1));
				game.players.push(new Player(consts.MAP_WIDTH * 11 / 12, consts.MAP_HEIGHT / 2 - consts.PLAYER_HEIGHT / 2, consts.PLAYER_WIDTH, consts.PLAYER_HEIGHT, "white", 2, id_p2));
			}
			else if (socket.id == id_p2) {
				game.players.push(new Player(consts.MAP_WIDTH * 11 / 12, consts.MAP_HEIGHT / 2 - consts.PLAYER_HEIGHT / 2, consts.PLAYER_WIDTH, consts.PLAYER_HEIGHT, "white", 2, id_p2));
				game.players.push(new Player(consts.MAP_WIDTH / 12, consts.MAP_HEIGHT / 2 - consts.PLAYER_HEIGHT / 2, consts.PLAYER_WIDTH, consts.PLAYER_HEIGHT, "white", 1, id_p1));
			}
			game.pong = new Pong;
		}
	});
	
	socket.on("countdown-server", () => {
		if (game.state == "countdown") {
			game.timer--;
			if (game.timer == -1)
				game.state = "in-game";
		}
	});
}

function listen_stop_events() {
	socket.on("player-disconnect", (index : number) => {
		in_main_menu();
	});

	socket.on("restart-server", () => {
		game.timer = 3;
		game.state = "in-game";
		game.score = [0, 0];
	})
}

function listen_move_events() {
	socket.on("switch_readiness-server", (id : string) => {
		let count = 0;
		for (let player of game.players) {
			if (player.id == id)
				player.ready = !player.ready;
			if (player.ready)
				count++;
		}
		if (count == game.players.length) {
			game.state = "countdown";
			socket.emit("countdown_start");
		}
	});

	socket.on("updated_pos", (
		pong_state : [[number, number], [number, number]], 
		p1_state : [string, [number, number], [number, number]], 
		p2_state : [string, [number, number], [number, number]], 
		score : [number, number]
	) => {
		game.score = score;
		game.pong.pos = pong_state[0];
		game.pong.velocity = pong_state[1];
		if (p1_state[0] == socket.id) {
			game.players[0].pos = p1_state[1];
			game.players[0].velocity = p1_state[2];
			game.players[1].pos = p2_state[1];
			game.players[1].velocity = p2_state[2];
		}
		else if (p2_state[0] == socket.id) {
			game.players[0].pos = p2_state[1];
			game.players[0].velocity = p2_state[2];
			game.players[1].pos = p1_state[1];
			game.players[1].velocity = p1_state[2];
		}
	});
}

