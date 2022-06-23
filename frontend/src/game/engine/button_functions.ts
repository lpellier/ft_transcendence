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

		buttons.map_original.show();
		buttons.map_city.show();
		buttons.map_casino.show();
		game.state = "in-menu-create";
	}
}

function createGame() {
	if (mouseButton === LEFT) {
		if (game.publicity === "local")
			startLocal();
		else
			socket.emit("matchmaking", game.publicity, false, game.score_limit, game.map.name);
	}
}
function matchmaking() {
	if (mouseButton === LEFT)
		socket.emit("matchmaking", "public", true, 10, "original");
}

function highlightSpectateButton() {
	// @ts-ignore: next-linee
	this.style("color", "#d4d4d4");
	game.hover_spectator = true;

}
function resetSpectateButton() {
	// @ts-ignore: next-line
	this.style("color", "white");
	game.hover_spectator = false;
}


function highlightButton() {
	// @ts-ignore: next-line
	this.style("color", "#d4d4d4");
}
function resetButton() {
	// @ts-ignore: next-line
	this.style("color", "white");
}

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
		buttons.spectate.show();
	}
}

function clickSpectate() {
	if (mouseButton === LEFT) {
		game.spectator = !game.spectator;
		if (!game.spectator) {
			// @ts-ignore : next-line
			this.style("border-color", "white");	
		}
		else if (game.spectator) {
			// @ts-ignore : next-line
			this.style("border-color", "#177bad");	
		}
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
			this.style("outline", "3px solid");
		}
		game.ai = !game.ai;
	}
}

function clickMapOriginal() {
	if (mouseButton === LEFT) {
		// @ts-ignore : next-line
		this.style("outline", "3px solid");
		buttons.map_city.style("outline", "none");
		buttons.map_casino.style("outline", "none");
		game.map = consts.original_map;
	}
}
function clickMapCity() {
	if (mouseButton === LEFT) {
		// @ts-ignore : next-line
		this.style("outline", "3px solid");
		buttons.map_original.style("outline", "none");
		buttons.map_casino.style("outline", "none");
		game.map = consts.city_map;
	}
}
function clickMapCasino() {
	if (mouseButton === LEFT) {
		// @ts-ignore : next-line
		this.style("outline", "3px solid");
		buttons.map_city.style("outline", "none");
		buttons.map_original.style("outline", "none");
		game.map = consts.casino_map;
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
