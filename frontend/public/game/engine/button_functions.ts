function goToMainMenu() {
	if (mouseButton === LEFT)
		inMainMenu();
}

function createGameMenu() {
	if (mouseButton === LEFT) {
		buttons.hide();
		inputs.hide();
	
		buttons.return.show();
		buttons.anyone_can_join.show();
		buttons.local.show();
		buttons.invitation_only.show();
		buttons.validate.show();
		buttons.plus.show();
		buttons.minus.show();
		inputs.score_limit.show();
		inputs.score_limit.attribute("value", game.score_limit);
		buttons.opponent_left_ok.parent().style["z-index"] = 0; // deal with buttons overlapping
		game.state = "in-menu-create";
	}
}

function createGame() {
	if (mouseButton === LEFT) {
		if (game.publicity === "local")
			startLocal();
		else
			socket.emit("matchmaking", game.publicity, false, game.score_limit);
	}
}
function matchmaking() {
	if (mouseButton === LEFT)
		socket.emit("matchmaking", "public", true, 10);
}

function highlightButton() {
	// @ts-ignore: next-line
	this.style("color", "#d4d4d4");
}
function resetButton() {
	// @ts-ignore: next-line
	this.style("color", "white");
}

// matchmaking args : publicity, matchamking_boolean, score_limit, map_index

function plusScoreLimit() {
	if (mouseButton === LEFT && game.score_limit < 15) {
		game.score_limit++;
		inputs.score_limit.attribute("value", game.score_limit);
	}

}
function minusScoreLimit() {
	if (mouseButton === LEFT && game.score_limit > 1) {
		game.score_limit--;
		inputs.score_limit.attribute("value", game.score_limit);
	}
}

function readRoomID() {
	if (mouseButton === LEFT) {
		game.state = "in-menu-input";
		buttons.hide();
		inputs.hide();
		inputs.join.show();
		buttons.return.show();
	}
}

function clickAnyone() {
	if (mouseButton === LEFT)
		game.publicity = buttons.clickAnyone();
}
function clickInvitation() {
	if (mouseButton === LEFT)
		game.publicity = buttons.clickInvitation();
}
function clickLocal() {
	if (mouseButton === LEFT)
		game.publicity = buttons.clickLocal();
}

function clickAi() {
	if (mouseButton === LEFT) {
		if (game.ai) {
			// @ts-ignore : next-line
			this.style("outline", "none");
		}
		else {
			// @ts-ignore : next-line
			this.style("outline", "5px solid");
		}
		game.ai = !game.ai;
	}
}

function startLocal() {
	if (mouseButton === LEFT) {
		game.local = true;
		buttons.hide();
		inputs.hide();
		game.timer = 4;
		for (let i = 0; i < 5; i++) {
			setTimeout(() => {
				game.timer--;
				if (game.timer === -1 && game.state === "countdown") {
					game.state = "in-game";
				}
			}, i * 1000);
		}
		game.state = "countdown";
		game.players.push(new Player(1, "first"));
		game.players.push(new Player(2, "second"));		
		game.pong = new Pong();
		game.room_id = "Local";
	}
}