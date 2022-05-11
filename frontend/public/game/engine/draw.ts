// function drawPlayers() { // ? if i put predictions, i should keep this
// 	// if (!game.local) { // ? prediction for other player based on his movement
// 	// 	game.players[1].calculateNewPos();
// 	// 	if (player_input.length > 0) { // ? Prediction based on input not yet processed
// 	// 		(player_input[0] === 1 ? game.players[0].move_up() : (player_input[0] === -1 ? game.players[0].move_down() : 0));
// 	// 		player_input.splice(0, 1);
// 	// 	}
// 	// }

// 	// for (let i : number = 0; i < game.players.length; i++) {
// 	// 	game.players[i].render();
// 	// }
// }

// ? for draw help
let arrow_anim : number = 0;
let grow : boolean = true;

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
		triangle(consts.MAP_WIDTH / 6, consts.MAP_HEIGHT / 2, consts.MAP_WIDTH / 6 + arrow_width, consts.MAP_HEIGHT / 2 + arrow_width, consts.MAP_WIDTH / 6 + arrow_width, consts.MAP_HEIGHT / 2 - arrow_width);
	else
		triangle(consts.MAP_WIDTH * 5 / 6, consts.MAP_HEIGHT / 2, consts.MAP_WIDTH * 5 / 6 - arrow_width, consts.MAP_HEIGHT / 2 + arrow_width, consts.MAP_WIDTH * 5 / 6 - arrow_width, consts.MAP_HEIGHT / 2 - arrow_width);
	pop();
}

function drawInput() {
	keys.w.show();
	keys.a.show();
	keys.s.show();
	keys.d.show();

	keys.up.show();
	keys.left.show();
	keys.down.show();
	keys.right.show();
}
