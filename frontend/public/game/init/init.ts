function createGameMenu() {
	if (mouseButton === LEFT) {
		buttons.hide();
		inputs.hide();
	
		buttons.return.show();
		buttons.anyone_can_join.show();
		buttons.friends_can_join.show();
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

// matchmaking args : publicity, matchamking_boolean, score_limit, map_index

function createGame() {
	if (mouseButton === LEFT)
		socket.emit("matchmaking", game.publicity, false, game.score_limit);
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

function plusScoreLimit() {
	if (game.score_limit < 15) {
		game.score_limit++;
		inputs.score_limit.attribute("value", game.score_limit);
	}

}
function minusScoreLimit() {
	if (game.score_limit > 1) {
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
function clickFriends() {
	if (mouseButton === LEFT)
		game.publicity = buttons.clickFriends();
}
function clickInvitation() {
	if (mouseButton === LEFT)
		game.publicity = buttons.clickInvitation();
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

function createCustomButton(title : string, mPressed : any, mOver : any = highlightButton, mOut : any = resetButton, size_x : number = consts.std_width, size_y : number = consts.std_height) {
	let button = createButton(title);
	button.style("color", "white");
	button.style("font-size", (Math.sqrt(Math.pow(size_x, 2) + Math.pow(size_y, 2)) / 8).toString() + "px");
	button.style("font-family", "PressStart2P-Regular");
	button.style("background-color", "black");
	button.style("border-radius", "1em");
	button.size(size_x, size_y); // 280, 175 default

	button.mousePressed(mPressed);
	button.mouseOver(mOver);
	button.mouseOut(mOut);

	return button;
}

function createCustomInput(title : string) {
	let input = createInput(title);
	input.style("height", (consts.HEIGHT / 10).toString() + "px");
	input.style("font-size", consts.std_font_size.toString() + "px");
	input.style("font-family", "PressStart2P-Regular");
	input.style("background-color", "black");
	input.style("color", "white");
	input.style("border", "3px solid white");
	input.style("border-radius", "0.5em");
	input.style("outline", "none");

	return input;
}
