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
	return [-1,-1];
}

function intersect(a : [number, number], b : [number, number], c : [number, number], d : [number, number], axis : string, side : string) : [boolean, number, string, string] {
	if (ccw(a, c, d) != ccw(b, c, d) && ccw(a, b, c) != ccw(a, b, d)) {
		// if ball trajectory crosses middle of paddle, sent back horizontally
		if (a[1] === b[1])
			return ([true, 0, axis, side]);
		const pt : [number, number] = intercept(a[0], a[1], b[0], b[1], c[0], c[1], d[0], d[1]);
		let relative : number = 0;
		if (axis === "y") {
			relative = (c[1] + (d[1] - c[1]) / 2) - pt[1]; // middle of paddle minus hitpoint for relative intersection on y axis
			relative /= ((d[1] - c[1]) / 2);
		}
		else if (axis === "x") {
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
// ? right bound : consts.MAP_WIDTH

function checkCollisions() {
	// Implement acceleration here
	if (game.frames_since_point === 0)
		game.pong.speed = consts.PONG_BASE_SPEED;
	else if (game.pong.speed < consts.PONG_MAX_SPEED) {
		if (game.pong.velocity[0] > 0)
			game.pong.velocity[0] += consts.PONG_ACCELERATION;
		else
			game.pong.velocity[0] -= consts.PONG_ACCELERATION;
		if (game.pong.velocity[1] > 0)
			game.pong.velocity[1] += consts.PONG_ACCELERATION;
		else
			game.pong.velocity[1] -= consts.PONG_ACCELERATION;
		game.pong.speed += consts.PONG_ACCELERATION * 2;
	}

	game.frames_since_point++;

	// ? collision with bounds
	if (game.local) {
		if (game.pong.velocity[1] > 0 && game.pong.pos[1] + game.pong.diameter > consts.BOT_BOUND) {
			game.pong.pos[1] = consts.BOT_BOUND - game.pong.diameter;
			game.pong.velocity[1] = -game.pong.velocity[1];
			return ;
		}
		else if (game.pong.velocity[1] < 0 && game.pong.pos[1] < consts.TOP_BOUND) {
			game.pong.pos[1] = consts.TOP_BOUND;
			game.pong.velocity[1] = -game.pong.velocity[1];
			return;
		}
		else if (game.pong.velocity[0] > 0 && game.pong.pos[0] + game.pong.diameter > consts.RIGHT_BOUND) {
			game.pong.relaunchPong("right");
			game.score[0]++;
			if (game.score[0] >= game.score_limit)
				game.state = "game-over";
			game.frames_since_point = 0;
			return ;
		}
		else if (game.pong.velocity[0] < 0 && game.pong.pos[0] < consts.LEFT_BOUND) {
			game.pong.relaunchPong("left");
			game.score[1]++;
			if (game.score[1] >= game.score_limit)
				game.state = "game-over";
			game.frames_since_point = 0;
			return ;
		}
	}
	
	let player = (game.pong.pos[0] < consts.MAP_WIDTH / 2 ? game.players[0] : game.players[1]);

	if (player.distanceTo(game.pong.pos) > 50)
		return ;

	// ? collision with paddles
	let angle : [boolean, number, string, string] = [false, 0, "x", "side"];
	angle = collisionPaddle(player, angle);
	
	if (angle[0] === true) {
		let max_angle_percentage : number = Math.abs(angle[1]) / (Math.PI * 5 / 12); // ? number that lets me add speed to acute angled shots
		// ? for bot / top collisions
		if (angle[2] === "x") {
			if (angle[3] === "top")
				game.pong.velocity[1] = (1 + consts.PONG_ACCELERATION_ACUTE_ANGLE * max_angle_percentage) * game.pong.speed * -Math.cos(angle[1]);
			else if (angle[3] === "bot")
				game.pong.velocity[1] = (1 + consts.PONG_ACCELERATION_ACUTE_ANGLE * max_angle_percentage) * game.pong.speed * Math.cos(angle[1]);
			game.pong.velocity[0] = (1 + consts.PONG_ACCELERATION_ACUTE_ANGLE * max_angle_percentage) * game.pong.speed * -Math.sin(angle[1]);
		}
		// ? invert velocity indexes for left / right collisions
		else if (angle[2] === "y") {
			if (game.pong.pos[0] < consts.MAP_WIDTH / 2)
				game.pong.velocity[0] = (1 + consts.PONG_ACCELERATION_ACUTE_ANGLE * max_angle_percentage) * game.pong.speed * Math.cos(angle[1]);
			else
				game.pong.velocity[0] = (1 + consts.PONG_ACCELERATION_ACUTE_ANGLE * max_angle_percentage) * game.pong.speed * -Math.cos(angle[1]);
			game.pong.velocity[1] = (1 + consts.PONG_ACCELERATION_ACUTE_ANGLE * max_angle_percentage) * game.pong.speed * -Math.sin(angle[1]);	
		}
	}
}

function collisionPaddle(player : Player, angle : [boolean, number, string, string]) : [boolean, number, string, string] {
	let pong_points_hit : [[number, number], [number, number], [number, number]] =
		player.index === 1 ? [game.pong.leftUp(), game.pong.left(), game.pong.leftDown()] :
		[game.pong.rightUp(), game.pong.right(), game.pong.rightDown()];

	let paddle_side_hit : [[number, number], [number, number]] = player.index === 1 ? 
		[player.rightUp(), player.rightDown()] : [player.leftUp(), player.leftDown()];

	// ** CHECKING SIDE OF PADDLE ** //
	if (angle[0] === false)
		angle = intersect(pong_points_hit[1],
			game.pong.ballMoves(pong_points_hit[1]),
			paddle_side_hit[0], paddle_side_hit[1], "y", "side");

	if (angle[0] === false)
		angle = intersect(pong_points_hit[0],
			game.pong.ballMoves(pong_points_hit[0]),
			paddle_side_hit[0], paddle_side_hit[1], "y", "side");

	if (angle[0] === false)
		angle = intersect(pong_points_hit[2],
			game.pong.ballMoves(pong_points_hit[2]),
			paddle_side_hit[0], paddle_side_hit[1], "y", "side");

	// ** CHECKING BOTTOM OF PADDLE ** //
	if (angle[0] === false)
		angle = intersect(game.pong.up(),
			game.pong.ballMoves(game.pong.up()),
			player.leftDown(), player.rightDown(), "x", "bot");

	if (angle[0] === false)
		angle = intersect(game.pong.leftUp(),
			game.pong.ballMoves(game.pong.leftUp()),
			player.leftDown(), player.rightDown(), "x", "bot");
	
	if (angle[0] === false)
		angle = intersect(game.pong.rightUp(),
			game.pong.ballMoves(game.pong.rightUp()),
			player.leftDown(), player.rightDown(), "x", "bot");

	// ** CHECKING TOP OF PADDLE ** //
	if (angle[0] === false)
		angle = intersect(game.pong.down(),
			game.pong.ballMoves(game.pong.down()),
			player.leftUp(), player.rightUp(), "x", "top");

	if (angle[0] === false)
		angle = intersect(game.pong.leftDown(),
			game.pong.ballMoves(game.pong.leftDown()),
			player.leftUp(), player.rightUp(), "x", "top");
	
	if (angle[0] === false)
		angle = intersect(game.pong.rightDown(),
			game.pong.ballMoves(game.pong.rightDown()),
			player.leftUp(), player.rightUp(), "x", "top");

	return angle;
}