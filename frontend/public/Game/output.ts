function output_announcement(msg : string, text_size : number, pos_x : number, pos_y : number) {
	push();
	fill("white");
	textFont(g_font);
	noStroke();
	textSize(text_size);
	textAlign(CENTER);
	text(msg, pos_x, pos_y);
	pop();
}

function draw_player_readiness() {
	for (const player of game.players) {
		push();
		textSize(32)
		textAlign(CENTER);
		fill("white");
		push();
		textSize(30);
		textFont(g_font);
		text("P" + player.index, (player.index == 1 ? MAP_WIDTH / 4 : MAP_WIDTH * 3 / 4), MAP_HEIGHT * 2 / 3);
		pop();
		if (player.ready == true)
			text("✅", (player.index == 1 ? MAP_WIDTH / 4 : MAP_WIDTH * 3 / 4) + 50, MAP_HEIGHT * 2 / 3 - 3);
		else
			text("❌", (player.index == 1 ? MAP_WIDTH / 4 : MAP_WIDTH * 3 / 4) + 50, MAP_HEIGHT * 2 / 3 - 3);
		pop();
	}
}

function output_countdown() {
	output_announcement("" + game.timer, 45, MAP_WIDTH / 2 + 5, MAP_HEIGHT / 2 + 20);
}
