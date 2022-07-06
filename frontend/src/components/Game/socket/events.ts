function listenStartEvents() {
	socket.on("waiting-player", (r_id : string, score_limit : number, map : string) => {
		game.room_id = r_id;
		game.score_limit = score_limit;
		errors.set_false();
		buttons.hide();
		inputs.hide()
	
		buttons.return.show();
	
		if (map === "city")
			game.map = consts.city_map;
		else if (map === "casino")
			game.map = consts.casino_map;
		game.setState("waiting-player");
	});
	socket.on("spectate", (r_id : string, score_limit : number, map : string, game_state : string, id_p1 : string, id_p2 : string, name_p1 : string, name_p2 : string) => {
		game.room_id = r_id;
		game.score_limit = score_limit;
		errors.set_false();
	
		if (map === "city")
			game.map = consts.city_map;
		else if (map === "casino")
			game.map = consts.casino_map;
		game.setState(game_state);
		buttons.hide();
		inputs.hide();

		game.players.push(new Player(1, id_p1, name_p1));
		game.players.push(new Player(2, id_p2, name_p2));
		game.pong = new Pong;
	});

	socket.on("matchmaking-error", (error : string) => {
		errors.set_false();
		if (error === "game_full")
			errors.game_full = true;
		else if (error === "game_not_found")
			errors.game_not_found = true;	
	});

	socket.on("waiting-readiness", (id_p1 : string, id_p2 : string, name_p1 : string, name_p2 : string) => {
		if (game.players.length == 2) {
			if (game.players[1].id == "null")
				game.players[1].id = id_p2;
			if (game.players[1].username == "null")
				game.players[1].username = id_p2;
			game.setState("waiting-readiness");
		}
		if (game.players.length === 0) {
			game.setState("waiting-readiness");
			if (socket.id === id_p1) {
				game.players.push(new Player(1, id_p1, name_p1));
				game.players.push(new Player(2, id_p2, name_p2));
			}
			else if (socket.id === id_p2) {
				game.players.push(new Player(2, id_p2, name_p2));
				game.players.push(new Player(1, id_p1, name_p1));
			}
			game.pong = new Pong;
		}
	});
	
	socket.on("countdown-server", () => {
		if (game.state === "countdown" || game.state === "relaunch-countdown") {
			game.timer--;
			if (game.timer === 0)
			consts.playBip(consts.BIP_FINAL);
			else if (game.timer > 0)
				consts.playBip(consts.BIP);
			if (game.timer === -1)
				game.setState("in-game");
		}
	});

	socket.on("relaunch", () => {
		game.setState("relaunch-countdown");
		game.timer = 1;
		consts.playBip(consts.BIP);
	});
}

function listenStopEvents() {
	socket.on("player-disconnect", (index : number) => {
		opponentLeftMenu();
	});

	socket.on("game-over", () => {
		game.setState("game-over");
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
			game.setState("countdown");
			socket.emit("countdown_start", game.players[0].username, game.players[1].username);
			consts.playBip(consts.BIP);
		}
	});

	socket.on("bumper-hit", (index : number) => {
		consts.playRandomBumperSound();
		if (index === 0)
			bumpers[0].hit = true;
		if (index === 1)
			bumpers[1].hit = true;
	});

	socket.on("player-hit", () => {
		consts.playRandomPaddleSound();
	});
	
	socket.on("wall-hit", () => {
		consts.playRandomWallSound();
	});

	socket.on("updated_pos", (
		pong_pos : [number, number],
		pong_vel : [number, number],
		p1_state : [string, [number, number]],
		p2_state : [string, [number, number]],
		score : [number, number],
		pong_value : number
	) => {
			if (game.state === "in-game" || game.state === "relaunch-countdown" || game.state === "countdown") {
				
				game.pong.pos[0] = pong_pos[0] * consts.WIDTH / 1200;
				game.pong.pos[1] = pong_pos[1] * consts.HEIGHT / 750;
				game.pong.velocity = pong_vel;
				if (p1_state[0] === socket.id) {
					game.players[0].pos[0] = p1_state[1][0] * consts.WIDTH / 1200;
					game.players[0].pos[1] = p1_state[1][1] * consts.HEIGHT / 750;
					game.players[1].pos[0] = p2_state[1][0] * consts.WIDTH / 1200;
					game.players[1].pos[1] = p2_state[1][1] * consts.HEIGHT / 750;
					if (game.score[0] != score[0] || game.score[1] != score[1]) {
						game.frame_count_shake = 0;
						consts.playScore();
					}
					game.score[0] = score[0];
					game.score[1] = score[1];
				}
				else if (p2_state[0] === socket.id) {
					game.players[0].pos[0] = p2_state[1][0] * consts.WIDTH / 1200;
					game.players[0].pos[1] = p2_state[1][1] * consts.HEIGHT / 750;
					game.players[1].pos[0] = p1_state[1][0] * consts.WIDTH / 1200;
					game.players[1].pos[1] = p1_state[1][1] * consts.HEIGHT / 750;
					if (game.score[0] != score[1] || game.score[1] != score[0]) {
						game.frame_count_shake = 0;
						consts.playScore();
					}
					game.score[0] = score[1];
					game.score[1] = score[0];
				}
				else { // spectate
					game.players[0].pos[0] = p1_state[1][0] * consts.WIDTH / 1200;
					game.players[0].pos[1] = p1_state[1][1] * consts.HEIGHT / 750;
					game.players[1].pos[0] = p2_state[1][0] * consts.WIDTH / 1200;
					game.players[1].pos[1] = p2_state[1][1] * consts.HEIGHT / 750;
					if (game.score[0] != score[0] || game.score[1] != score[1]) {
						game.frame_count_shake = 0;
						consts.playScore();
					}
					game.score[0] = score[0];
					game.score[1] = score[1];
				}
				game.pong.value = pong_value;	
			}
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
0
	for (let bumper of bumpers) {
		bumper.resize();
	}
}

function windowResized() {
	noLoop();
	resizeEverything();

	resizeCanvas(consts.WIDTH, consts.HEIGHT);
	loop();
}
