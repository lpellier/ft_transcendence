function listenStartEvents() {
	socket.on("waiting-player", (r_id : string, score_limit : number, map : string) => {
		game.room_id = r_id;
		game.state = "waiting-player";
		game.score_limit = score_limit;
		errors.set_false();
		buttons.hide();
		inputs.hide()
	
		buttons.return.show();
	
		if (map === "city")
			game.map = consts.city_map;
		else if (map === "casino")
			game.map = consts.casino_map;
	});
	socket.on("spectate", (r_id : string, score_limit : number, map : string, game_state : string, id_p1 : string, id_p2 : string) => {
		game.room_id = r_id;
		game.score_limit = score_limit;
		errors.set_false();
	
		if (map === "city")
			game.map = consts.city_map;
		else if (map === "casino")
			game.map = consts.casino_map;
		game.state = game_state;
		buttons.hide();
		inputs.hide();

		game.players.push(new Player(1, id_p1));
		game.players.push(new Player(2, id_p2));
		game.pong = new Pong;
	});

	socket.on("matchmaking-error", (error : string) => {
		errors.set_false();
		if (error === "game_full")
			errors.game_full = true;
		else if (error === "game_not_found")
			errors.game_not_found = true;	
	});

	socket.on("waiting-readiness", (id_p1 : string, id_p2 : string) => {
		if (game.players.length === 0) {
			game.state = "waiting-readiness"
			if (socket.id === id_p1) {
				game.players.push(new Player(1, id_p1));
				game.players.push(new Player(2, id_p2));
			}
			else if (socket.id === id_p2) {
				game.players.push(new Player(2, id_p2));
				game.players.push(new Player(1, id_p1));
			}
			game.pong = new Pong;
		}
	});
	
	socket.on("countdown-server", () => {
		if (game.state === "countdown") {
			game.timer--;
			if (game.timer === -1)
				game.state = "in-game";
		}
	});
}

function listenStopEvents() {
	socket.on("player-disconnect", (index : number) => {
		opponentLeftMenu();
	});

	socket.on("restart-server", () => {
		game.timer = 3;
		game.state = "in-game";
		game.score = [0, 0];
	});

	socket.on("game-over", () => {
		game.state = "game-over";
	});
}

function listenMoveEvents() {
	socket.on("switch_readiness-server", (id : string) => {
		let count = 0;
		for (let player of game.players) {
			if (player.id === id)
				player.ready = !player.ready;
			if (player.ready)
				count++;
		}
		if (count === game.players.length) {
			game.state = "countdown";
			socket.emit("countdown_start");
		}
	});

	socket.on("updated_pos", (
		pong_pos : [number, number],
		p1_state : [string, [number, number]],
		p2_state : [string, [number, number]],
		score : [number, number],
		pong_value : number
	) => {
		if (game.state != "in-game")
			return ;
		game.score = score;
		game.pong.pos[0] = pong_pos[0] * consts.WIDTH / 1200;
		game.pong.pos[1] = pong_pos[1] * consts.HEIGHT / 750;
		if (p1_state[0] === socket.id) {
			game.players[0].pos[0] = p1_state[1][0] * consts.WIDTH / 1200;
			game.players[0].pos[1] = p1_state[1][1] * consts.HEIGHT / 750;
			game.players[1].pos[0] = p2_state[1][0] * consts.WIDTH / 1200;
			game.players[1].pos[1] = p2_state[1][1] * consts.HEIGHT / 750;
		}
		else if (p2_state[0] === socket.id) {
			game.players[0].pos[0] = p2_state[1][0] * consts.WIDTH / 1200;
			game.players[0].pos[1] = p2_state[1][1] * consts.HEIGHT / 750;
			game.players[1].pos[0] = p1_state[1][0] * consts.WIDTH / 1200;
			game.players[1].pos[1] = p1_state[1][1] * consts.HEIGHT / 750;
		}
		else { // spectate
			game.players[0].pos[0] = p1_state[1][0] * consts.WIDTH / 1200;
			game.players[0].pos[1] = p1_state[1][1] * consts.HEIGHT / 750;
			game.players[1].pos[0] = p2_state[1][0] * consts.WIDTH / 1200;
			game.players[1].pos[1] = p2_state[1][1] * consts.HEIGHT / 750;
		}
		game.pong.value = pong_value;
	});
}

function resizeEverything() {
	consts.resize();
	for (let player of game.players)
		if (player)	
			player.resize();
	if (game.pong)
		game.pong.resize();
	if (game.map)
		game.map.resize(consts.WIDTH, consts.HEIGHT);
	buttons.resize();
	keys.resize();
	inputs.resize();
}

function windowResized() {
	noLoop();
	resizeEverything();

	resizeCanvas(consts.WIDTH, consts.HEIGHT);
	loop();
}
