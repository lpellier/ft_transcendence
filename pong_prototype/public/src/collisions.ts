function ccw(a : [number, number], b : [number, number], c : [number, number]) {
	return (c[1] - a[1]) * (b[0] - a[0]) > (b[1] - a[1]) * (c[0] - a[0]);
}

function intercept(x1 : number, y1 : number, x2 : number, y2 : number, x3 : number, y3 : number, x4 : number, y4 : number) : [number, number] {
	let denom = ((y4-y3) * (x2-x1)) - ((x4-x3) * (y2-y1));
	if (denom != 0) {
	  let ua = (((x4-x3) * (y1-y3)) - ((y4-y3) * (x1-x3))) / denom;
	  if ((ua >= 0) && (ua <= 1)) {
		let ub = (((x2-x1) * (y1-y3)) - ((y2-y1) * (x1-x3))) / denom;
		if ((ub >= 0) && (ub <= 1)) {
		  let x = x1 + (ua * (x2-x1));
		  let y = y1 + (ua * (y2-y1));
		  return [x, y];
		}
	  }
	}
	return null;
}

function intersect(a : [number, number], b : [number, number], c : [number, number], d : [number, number], axis : string, side : string) : [boolean, number, string, string] {
	if (ccw(a, c, d) != ccw(b, c, d) && ccw(a, b, c) != ccw(a, b, d)) {
		// if ball trajectory crosses middle of paddle, sent back horizontally
		if (a[1] == b[1])
			return ([true, 0, axis, side]);
		const pt : [number, number] = intercept(a[0], a[1], b[0], b[1], c[0], c[1], d[0], d[1]);
		let relative : number;
		if (axis == "y") {
			relative = (c[1] + (d[1] - c[1]) / 2) - pt[1]; // middle of paddle minus hitpoint for relative intersection on y axis
			relative /= ((d[1] - c[1]) / 2);
		}
		else if (axis == "x") {
			relative = (c[0] + (d[0] - c[0]) / 2) - pt[0]; // middle of paddle minus hitpoint for relative intersection on x axis
			relative /= ((d[0] - c[0]) / 2);
		}
		let bounce_angle = relative * ((5 * Math.PI) / 12);
		return [true, bounce_angle, axis, side];
	}
	return [false, 0, axis, side];
}

// ? MAP BOUNDS :
// ? top bound : 10
// ? bottom bound : MAP_HEIGHT - 10
// ? left bound : 0
// ? right bound : MAP_WIDTH

function checkCollisions() {
	// Implement acceleration here
	if (game.framesSincePoint == 0)
		game.pong.speed = 4;
	else if (game.pong.speed < PONG_MAX_SPEED) {
		if (game.pong.velocity[0] > 0)
			game.pong.velocity[0] += 0.0025;
		else
			game.pong.velocity[0] -= 0.0025;
		if (game.pong.velocity[1] > 0)
			game.pong.velocity[1] += 0.0025;
		else
			game.pong.velocity[1] -= 0.0025;
		game.pong.speed += 0.005;
	}

	game.framesSincePoint++;

	// ? collision with bounds
	if (game.pong.velocity[1] > 0 && game.pong.pos[1] + game.pong.diameter > bot_bound) {
		game.pong.pos[1] = bot_bound - game.pong.diameter;
		game.pong.velocity[1] = -game.pong.velocity[1];
		return ;
	}
	else if (game.pong.velocity[1] < 0 && game.pong.pos[1] < top_bound) {
		game.pong.pos[1] = top_bound;
		game.pong.velocity[1] = -game.pong.velocity[1];
		return;
	}
	else if (game.pong.velocity[0] > 0 && game.pong.pos[0] + game.pong.diameter > right_bound) {
		game.pong.relaunchPong("right");
		game.score[0]++;
		game.framesSincePoint = 0;
		return ;
	}
	else if (game.pong.velocity[0] < 0 && game.pong.pos[0] < left_bound) {
		game.pong.relaunchPong("left");
		game.score[1]++;
		game.framesSincePoint = 0;
		return ;
	}
	
	// ? collision with paddles
	let angle : [boolean, number, string, string] = [false, 0, "x", "side"];
	if (game.pong.pos[0] < MAP_WIDTH / 2)
		angle = collision_paddle(game.players[0], angle);
	else
		angle = collision_paddle(game.players[1], angle);
	
	if (angle[0] == true) {
		// ? for bot / top collisions
		if (angle[2] == "x") {
			if (angle[3] == "top")
				game.pong.velocity[1] = game.pong.speed * -Math.cos(angle[1]);
			else if (angle[3] == "bot")
				game.pong.velocity[1] = game.pong.speed * Math.cos(angle[1]);
			game.pong.velocity[0] = game.pong.speed * -Math.sin(angle[1]);
		}
		// ? invert velocity indexes for left / right collisions
		else if (angle[2] == "y") {
			if (game.pong.pos[0] < MAP_WIDTH / 2)
				game.pong.velocity[0] = game.pong.speed * Math.cos(angle[1]);
			else
				game.pong.velocity[0] = game.pong.speed * -Math.cos(angle[1]);
			game.pong.velocity[1] = game.pong.speed * -Math.sin(angle[1]);	
		}
	}
}

function collision_paddle(player : Player, angle : [boolean, number, string, string]) : [boolean, number, string, string] {
	let pong_points_hit : [[number, number], [number, number], [number, number]] =
		player.index == 1 ? [game.pong.left_up(), game.pong.left(), game.pong.left_down()] :
		[game.pong.right_up(), game.pong.right(), game.pong.right_down()];

	let paddle_side_hit : [[number, number], [number, number]] = player.index == 1 ? 
		[player.right_up(), player.right_down()] : [player.left_up(), player.left_down()];

	// ** CHECKING SIDE OF PADDLE ** //
	if (angle[0] == false)
		angle = intersect(pong_points_hit[1],
			game.pong.ball_moves(pong_points_hit[1][0], pong_points_hit[1][1]),
			paddle_side_hit[0], paddle_side_hit[1], "y", "side");

	if (angle[0] == false)
		angle = intersect(pong_points_hit[0],
			game.pong.ball_moves(pong_points_hit[0][0], pong_points_hit[0][1]),
			paddle_side_hit[0], paddle_side_hit[1], "y", "side");

	if (angle[0] == false)
		angle = intersect(pong_points_hit[2],
			game.pong.ball_moves(pong_points_hit[2][0], pong_points_hit[2][1]),
			paddle_side_hit[0], paddle_side_hit[1], "y", "side");

	// ** CHECKING BOTTOM OF PADDLE ** //
	if (angle[0] == false)
		angle = intersect(game.pong.up(),
			game.pong.ball_moves(game.pong.c_x(), game.pong.pos[1]),
			player.left_down(), player.right_down(), "x", "bot");

	if (angle[0] == false)
		angle = intersect(game.pong.left_up(),
			game.pong.ball_moves(game.pong.pos[0], game.pong.pos[1]),
			player.left_down(), player.right_down(), "x", "bot");
	
	if (angle[0] == false)
		angle = intersect(game.pong.right_up(),
			game.pong.ball_moves(game.pong.pos[0] + game.pong.diameter, game.pong.pos[1]),
			player.left_down(), player.right_down(), "x", "bot");

	// ** CHECKING TOP OF PADDLE ** //
	if (angle[0] == false)
		angle = intersect(game.pong.down(),
			game.pong.ball_moves(game.pong.c_x(), game.pong.pos[1] + game.pong.diameter),
			player.left_up(), player.right_up(), "x", "top");

	if (angle[0] == false)
		angle = intersect(game.pong.left_down(),
			game.pong.ball_moves(game.pong.pos[0], game.pong.pos[1] + game.pong.diameter),
			player.left_up(), player.right_up(), "x", "top");
	
	if (angle[0] == false)
		angle = intersect(game.pong.right_down(),
			game.pong.ball_moves(game.pong.pos[0] + game.pong.diameter, game.pong.pos[1] + game.pong.diameter),
			player.left_up(), player.right_up(), "x", "top");

	return angle;
}