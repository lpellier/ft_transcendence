function inMainMenu() {
	if (game.state === "waiting-player")
		socket.emit("quit-own-game");
	should_load = false;
	game.reset();
	errors.set_false();
	buttons.reset();
	inputs.reset();
	inputs.create_inputs();
	game.setState("in-menu");
}

function opponentLeftMenu() {
	game.setState("opponent-left-menu");
	buttons.hide();
	buttons.opponent_left_ok.parent().style["z-index"] = 2; // deal with buttons overlapping
	buttons.opponent_left_ok.show();
}
