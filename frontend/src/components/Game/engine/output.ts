function outputAnnouncement(msg : string, text_size : number, pos_x : number, pos_y : number, color : string) {
	push();
	fill(color);
	noStroke();
	textSize(text_size);
	textAlign(CENTER);
	text(msg, pos_x, pos_y);
	pop();
}

function drawPlayerReadiness() {
	let icon_p1, icon_p2;

	for (const player of game.players) {
		push();
		textSize(32)
		textAlign(CENTER);
		fill("white");
		push();
		textSize(consts.std_font_size);
		text("P" + player.index, (player.index === 1 ? consts.WIDTH / 4 : consts.WIDTH * 3 / 4), consts.HEIGHT * 2 / 3);
		pop();
		if (player.ready === true)
			player.index === 1 ? icon_p1 = consts.MARK_ICON : icon_p2 = consts.MARK_ICON;
		else
			player.index === 1 ? icon_p1 = consts.CROSS_ICON : icon_p2 = consts.CROSS_ICON2;
		pop();
	}
	if (icon_p1.parent() != document.getElementById("icon-player_one"))
		icon_p1.parent(document.getElementById("icon-player_one"));
	icon_p1.show();

	if (icon_p2.parent() != document.getElementById("icon-player_two"))
		icon_p2.parent(document.getElementById("icon-player_two"));
	icon_p2.show();
}

function outputCountdown() {
	outputAnnouncement("" + game.timer, consts.std_font_size, consts.WIDTH * 0.505, consts.HEIGHT * 0.535,"white");
}

function outputScore(map_width : number, map_height : number) {
	push();
	textSize(consts.std_font_size);
	push();
	fill((game.score[0] > game.score[1] ? "white" : "grey")); // highlight better score
	if (game.score[0].toString().length > 1)
		text(game.score[0], map_width / 2 - map_width / 10, map_height / 9); // score
	else
		text(game.score[0], map_width / 2 - map_width / 16, map_height / 9); // score
	pop();
	push();
	fill((game.score[1] > game.score[0] ? "white" : "grey"));
	text(game.score[1], map_width / 2 + map_width / 30, map_height / 9); // score
	pop();
	pop();
}

function outputPlayerNames() {
	push();
	textSize(consts.small_font_size / 2);
	fill("rgba(255, 255, 255, 0.6)");
	textAlign(CENTER)
	text(game.players[0].username, consts.WIDTH * 0.1, consts.HEIGHT * 0.95);
	text(game.players[1].username, consts.WIDTH * 0.9, consts.HEIGHT * 0.95);
	pop();
}
