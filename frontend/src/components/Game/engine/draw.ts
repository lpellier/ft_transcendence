// ? for draw help
let arrow_anim : number = 0;
let grow : boolean = true;

function drawBallIntent() {
	let arrow_width = 10 + arrow_anim;
	if (grow)
		arrow_anim += 0.1;
	else
		arrow_anim -= 0.1;
	if (arrow_anim >= 5)
		grow = false;
	else if (arrow_anim <= 0)
		grow = true;
	push();
	fill("white");
	noStroke();
	if (game.pong.velocity[0] < 0)
		triangle(consts.WIDTH / 2.5, consts.HEIGHT / 2 + arrow_width / 2, consts.WIDTH / 2.5 + arrow_width, consts.HEIGHT / 2 + arrow_width + arrow_width / 2, consts.WIDTH / 2.5 + arrow_width, consts.HEIGHT / 2 - arrow_width + arrow_width / 2);
	else
		triangle(consts.WIDTH * 1.5 / 2.5, consts.HEIGHT / 2 + arrow_width / 2, consts.WIDTH * 1.5 / 2.5 - arrow_width, consts.HEIGHT / 2 + arrow_width + arrow_width / 2, consts.WIDTH * 1.5 / 2.5 - arrow_width, consts.HEIGHT / 2 - arrow_width + arrow_width / 2);
	pop();
}

function drawHelp() {
	let index = game.players[0].index;
	let arrow_width = 25 + arrow_anim;
	if (grow)
		arrow_anim += 0.5;
	else
		arrow_anim -= 0.5;
	if (arrow_anim >= 10)
		grow = false;
	else if (arrow_anim <= 0)
		grow = true;
	push();
	fill("white");
	noStroke();
	if (index === 1)
		triangle(consts.WIDTH / 6, consts.HEIGHT / 2, consts.WIDTH / 6 + arrow_width, consts.HEIGHT / 2 + arrow_width, consts.WIDTH / 6 + arrow_width, consts.HEIGHT / 2 - arrow_width);
	else
		triangle(consts.WIDTH * 5 / 6, consts.HEIGHT / 2, consts.WIDTH * 5 / 6 - arrow_width, consts.HEIGHT / 2 + arrow_width, consts.WIDTH * 5 / 6 - arrow_width, consts.HEIGHT / 2 - arrow_width);
	pop();
}

function drawMinimaps() {
	consts.original_map.originalMap();
	push();
	translate(consts.WIDTH * 0.1, consts.HEIGHT * 0.58);
	consts.original_map.render(0.2);
	pop();
	// outputAnnouncement("Original", 25, consts.WIDTH * 0.2, consts.HEIGHT * 0.70, "white");

	consts.city_map.cityMap();
	push();
	translate(consts.WIDTH * 0.4, consts.HEIGHT * 0.58);
	consts.city_map.render(0.2);
	pop();
	// outputAnnouncement("City", 25, consts.WIDTH * 0.5, consts.HEIGHT * 0.70, "#ffffff");

	consts.casino_map.casinoMap();
	push();
	translate(consts.WIDTH * 0.7, consts.HEIGHT * 0.58);
	consts.casino_map.render(0.2);
	pop();
	// outputAnnouncement("Casino", 25, consts.WIDTH * 0.8, consts.HEIGHT * 0.70, "#ffffff");
}

function drawInput() {
	if (game.players[0].index == 2) {
		keys.up.show();
		keys.left.show();
		keys.down.show();
		keys.right.show();
	}
	else {
		keys.w.show();
		keys.a.show();
		keys.s.show();
		keys.d.show();
	}

	if ((game.local && !game.ai)) {
		keys.up.show();
		keys.left.show();
		keys.down.show();
		keys.right.show();
	}
}

function drawSpectate() {
	if (game.state === "in-menu-input")
		image(consts.EYE_ICON, consts.WIDTH * 0.04, consts.HEIGHT * 0.01, consts.WIDTH * 0.1, consts.HEIGHT * 0.15);
	else
		image(consts.EYE_ICON, consts.WIDTH * 0.04, consts.HEIGHT * 0.05, consts.WIDTH * 0.1, consts.HEIGHT * 0.15);
	if (game.hover_spectator === true) {
		push();
		fill("rgba(0, 0, 0, 0.2)");
		rect(consts.WIDTH * 0.04, consts.HEIGHT * 0.01, consts.WIDTH * 0.1, consts.HEIGHT * 0.15);
		pop();
	}
	if (game.spectator === true && game.state === "in-menu-input") {
		outputAnnouncement("Spectate", consts.std_font_size, consts.WIDTH * 0.32, consts.HEIGHT * 0.11, "white");
	}
	else if (game.spectator === false && game.state === "in-menu-input") {
		outputAnnouncement("Play", consts.std_font_size, consts.WIDTH * 0.25, consts.HEIGHT * 0.11, "white");
	}
}
