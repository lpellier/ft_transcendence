function output_announcement(msg : string, text_size : number, pos_x : number, pos_y : number) {
	push();
	fill("white");
	textFont(consts.FONT);
	noStroke();
	textSize(text_size);
	textAlign(CENTER);
	text(msg, pos_x, pos_y);
	pop();
}

function draw_player_readiness() {
	let icon_p1, icon_p2;

	for (const player of game.players) {
		push();
		textSize(32)
		textAlign(CENTER);
		fill("white");
		push();
		textSize(30);
		textFont(consts.FONT);
		text("P" + player.index, (player.index == 1 ? consts.MAP_WIDTH / 4 : consts.MAP_WIDTH * 3 / 4), consts.MAP_HEIGHT * 2 / 3);
		pop();
		if (player.ready == true)
			player.index == 1 ? icon_p1 = consts.MARK_ICON : icon_p2 = consts.MARK_ICON;
		else
			player.index == 1 ? icon_p1 = consts.CROSS_ICON : icon_p2 = consts.CROSS_ICON2;
		pop();
	}
	if (icon_p1.parent() != document.getElementById("icon-player_one"))
		icon_p1.parent(document.getElementById("icon-player_one"));
	icon_p1.show();

	if (icon_p2.parent() != document.getElementById("icon-player_two"))
		icon_p2.parent(document.getElementById("icon-player_two"));
	icon_p2.show();
}

function output_countdown() {
	output_announcement("" + game.timer, 45, consts.MAP_WIDTH / 2 + 5, consts.MAP_HEIGHT / 2 + 20);
}
