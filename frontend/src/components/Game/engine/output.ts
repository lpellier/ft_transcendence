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
	outputAnnouncement("" + game.timer, consts.std_font_size, consts.WIDTH / 2 + 5, consts.HEIGHT / 2 + 20,"white");
}