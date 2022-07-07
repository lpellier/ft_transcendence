function movePlayers() {
	if (!game.local && !game.spectator) {
		if (game.players[0].index == 1) {
			if (keyIsDown(87)) {
				socket.emit("move_up", game.players[0].id);
			}
			else if (keyIsDown(83)) {
				socket.emit("move_down", game.players[0].id);
			}
			else
				socket.emit("move_null", game.players[0].id);
		}
		else if (game.players[0].index == 2) {
			if (keyIsDown(UP_ARROW)) {
				socket.emit("move_up", game.players[0].id);
			}
			else if (keyIsDown(DOWN_ARROW)) {
				socket.emit("move_down", game.players[0].id);
			}
			else
				socket.emit("move_null", game.players[0].id);
		}
	}
	else if (!game.spectator) {
		if (keyIsDown(87))
			game.players[0].moveUp();
		else if (keyIsDown(83))
			game.players[0].moveDown();
		else
			game.players[0].velocity[1] = 0;
		
		if (game.ai) {
			// ? chaser ai code
			let player_pos = game.players[1].pos[1] + game.players[0].height / 2;
			let pos_diff = player_pos - game.pong.cY();

			if (pos_diff > consts.HEIGHT / 150)
				game.players[1].moveUp();
			else if (pos_diff < -consts.HEIGHT / 150)
				game.players[1].moveDown();
			else
				game.players[1].velocity[1] = 0;
		}
		else {
			if (keyIsDown(UP_ARROW))
				game.players[1].moveUp();
			else if (keyIsDown(DOWN_ARROW))
				game.players[1].moveDown();
			else
				game.players[1].velocity[1] = 0;
		}

		if (game.state != "relaunch-countdown" && game.local)
			game.pong.calculateNewPos();
	}
}

function keyPressed() {
	if (game === null)
		return;
	if (!game.spectator && game.state === "waiting-readiness" && key === ' ') 
		socket.emit("switch_readiness", game.players[0].id);
	if (game.state === "in-menu-input" && keyCode === ENTER) {
		if (inputs.join.value()[0] === '#')
			inputs.join.value(inputs.join.value().slice(1));
		socket.emit("find_game", inputs.join.value(), game.spectator);
	}
}