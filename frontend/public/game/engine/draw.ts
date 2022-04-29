function draw_players() {
	if (!game.local) // ? prediction for other player based on his movement
		game.players[1].calculateNewPos();
	
	for (let i : number = 0; i < game.players.length; i++) {
		game.players[i].render();
	}
}

function draw_pong() {
	if (!game.local)
		game.pong.calculateNewPos();

	game.pong.render();
}

function draw_map() {
	background(0);
	push();
	noStroke();
	fill("white");
	textSize(14);
	textFont(consts.FONT);
	text("Room #" + game.room_id, 16, 25); // room id
	for (let i : number = consts.TOP_BOUND; i < consts.BOT_BOUND; i += 20)
		rect(consts.MAP_WIDTH / 2, i, 5, 10); // line in the middle
	rect(5, 5, consts.MAP_WIDTH - 10, 5); // bounds
	rect(5, consts.MAP_HEIGHT - 10, consts.MAP_WIDTH - 10, 5); // bounds
	textSize(50);
	textFont(consts.FONT);
	push();
	fill((game.score[0] > game.score[1] ? "white" : "#d4d4d4")); // highlight better score
	text(game.score[0], consts.MAP_WIDTH / 2 - 70, 90); // score
	pop();
	push();
	fill((game.score[1] > game.score[0] ? "white" : "#d4d4d4"));
	text(game.score[1], consts.MAP_WIDTH / 2 + 35, 90); // score
	pop();
	pop();
}

// ? for draw help
let arrow_anim : number = 0;
let grow : boolean = true;

function draw_help() {
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
	if (index == 1)
		triangle(consts.MAP_WIDTH / 6, consts.MAP_HEIGHT / 2, consts.MAP_WIDTH / 6 + arrow_width, consts.MAP_HEIGHT / 2 + arrow_width, consts.MAP_WIDTH / 6 + arrow_width, consts.MAP_HEIGHT / 2 - arrow_width);
	else
		triangle(consts.MAP_WIDTH * 5 / 6, consts.MAP_HEIGHT / 2, consts.MAP_WIDTH * 5 / 6 - arrow_width, consts.MAP_HEIGHT / 2 + arrow_width, consts.MAP_WIDTH * 5 / 6 - arrow_width, consts.MAP_HEIGHT / 2 - arrow_width);
	pop();
}

function draw_input() {
	keys.w.show();
	keys.a.show();
	keys.s.show();
	keys.d.show();

	keys.up.show();
	keys.left.show();
	keys.down.show();
	keys.right.show();
}

function draw_background() {
	background(0);
}
