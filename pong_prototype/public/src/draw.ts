function draw_players() {
	for (let i : number = 0; i < game.players.length; i++) {
		game.players[i].render();
	}
}

function draw_pong() {
	game.pong.render();
	push();
	fill('red');
	rect(game.pong.pos[0], game.pong.pos[1], 2, 2);
	pop();
}

function draw_map() {
	background(0);
	push();
	noStroke();
	fill("white");
	textSize(14);
	text("Room #" + game.room_id, 16, 25); // room id
	for (let i : number = 5; i < MAP_HEIGHT; i += 20)
		rect(MAP_WIDTH / 2, i, 5, 10); // line in the middle
	rect(5, 5, MAP_WIDTH - 10, 5); // bounds
	rect(5, MAP_HEIGHT - 10, MAP_WIDTH - 10, 5); // bounds
	textSize(50);
	textFont(g_font);
	text(game.score[0], MAP_WIDTH / 2 - 70, 90); // score
	text(game.score[1], MAP_WIDTH / 2 + 35, 90); // score
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
		triangle(MAP_WIDTH / 6, MAP_HEIGHT / 2, MAP_WIDTH / 6 + arrow_width, MAP_HEIGHT / 2 + arrow_width, MAP_WIDTH / 6 + arrow_width, MAP_HEIGHT / 2 - arrow_width);
	else
		triangle(MAP_WIDTH * 5 / 6, MAP_HEIGHT / 2, MAP_WIDTH * 5 / 6 - arrow_width, MAP_HEIGHT / 2 + arrow_width, MAP_WIDTH * 5 / 6 - arrow_width, MAP_HEIGHT / 2 - arrow_width);
	pop();
}

function draw_background() {
	background(0);
}
