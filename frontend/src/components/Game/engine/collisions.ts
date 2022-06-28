// Returns 1 if the lines intersect, otherwise 0. In addition, if the lines 
// intersect the intersection point may be stored in the floats i[0] and i[1].
function getLineIntersection(p0 : [number, number], p1 : [number, number], p2 : [number, number], p3 : [number, number]) : [number, number, string] {
	let s1 : [number, number] = [p1[0] - p0[0], p1[1] - p0[1]];
	let s2 : [number, number] = [p3[0] - p2[0], p3[1] - p2[1]];

	let s : number = (-s1[1] * (p0[0] - p2[0]) + s1[0] * (p0[1] - p2[1])) / (-s2[0] * s1[1] + s1[0] * s2[1]);
	let t : number = ( s2[0] * (p0[1] - p2[1]) - s2[1] * (p0[0] - p2[0])) / (-s2[0] * s1[1] + s1[0] * s2[1]);

	let i : [number, number, string] = [-1, -1, "side"];
    if (s >= 0 && s <= 1 && t >= 0 && t <= 1)
    {
        // Collision detected
        i[0] = p0[0] + (t * s1[0]);
        i[1] = p0[1] + (t * s1[1]);
        return i;
    }

    return i; // No collision
}

function relativeIntersection(intersection_point : [number, number, string], p1 : [number, number], p2 : [number, number]) : number {
	let middle : [number, number] = [p1[0] + (p2[0] - p1[0]) / 2 - intersection_point[0], p1[1] + (p2[1] - p1[1]) / 2 - intersection_point[1]];

	if (intersection_point[2] === "side")
		return middle[1] / ((p2[1] - p1[1]) / 2) * ((5 * Math.PI) / 12);
	else
		return middle[0] / ((p2[0] - p1[0]) / 2) * ((5 * Math.PI) / 12);
}

// ? MAP BOUNDS :
// ? top bound : 10
// ? bottom bound : HEIGHT - 10
// ? left bound : 0
// ? right bound : consts.WIDTH

function checkCollisions() {
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
	if (game.pong.pos[1] < consts.TOP_BOUND || game.pong.pos[1] + game.pong.diameter > consts.BOT_BOUND) {
		game.pong.velocity[1] *= -1;
		if (game.pong.pos[1] < consts.TOP_BOUND)
			game.pong.pos[1] = consts.TOP_BOUND + consts.HEIGHT * 0.005;
		consts.playRandomWallSound();
		return ;
	}
	else if (game.pong.pos[1] + game.pong.diameter > consts.BOT_BOUND) 
		game.pong.pos[1] = consts.BOT_BOUND - game.pong.diameter - consts.HEIGHT * 0.005;
	if (game.pong.velocity[0] > 0 && game.pong.pos[0] + game.pong.diameter > consts.RIGHT_BOUND)
		return game.scorePoint(true);
	else if (game.pong.velocity[0] < 0 && game.pong.pos[0] < consts.LEFT_BOUND)
		return game.scorePoint(false);
	
	if (game.map.name === "city") {
		for (let bumper of bumpers) {
			if (bumper.checkCollision(game.pong)) {
				consts.playRandomBumperSound();
				return ;
			}
		}
	}

	let player = (game.pong.pos[0] < consts.WIDTH / 2 ? game.players[0] : game.players[1]);

	// debugCollisions(player);

	// ? collision with paddles
	let angle : number = 0;
	let intersection_point : [number, number, string][] = [[-1, -1, "side"]]; // array of one element so that the variable is referenced in functions
	angle = collisionPaddle(player, intersection_point);
	
	if (intersection_point[0][0] != -1) {
		consts.playRandomPaddleSound();
		let max_angle_percentage : number = Math.abs(angle) / (Math.PI * 5 / 12); // ? number that lets me add speed to acute angled shots
		// ? for bot / top collisions
		if (intersection_point[0][2] === "top" || intersection_point[0][2] === "bot") {
			if (intersection_point[0][2] === "top")
				game.pong.velocity[1] = (1 + consts.PONG_ACCELERATION_ACUTE_ANGLE * max_angle_percentage) * game.pong.speed * -Math.cos(angle);
			else if (intersection_point[0][2] === "bot")
				game.pong.velocity[1] = (1 + consts.PONG_ACCELERATION_ACUTE_ANGLE * max_angle_percentage) * game.pong.speed * Math.cos(angle);
			game.pong.velocity[0] = (1 + consts.PONG_ACCELERATION_ACUTE_ANGLE * max_angle_percentage) * game.pong.speed * -Math.sin(angle);
		}
		// ? invert velocity indexes for left / right collisions
		else if (intersection_point[0][2] === "side") {
			if (game.pong.pos[0] < consts.WIDTH / 2)
				game.pong.velocity[0] = (1 + consts.PONG_ACCELERATION_ACUTE_ANGLE * max_angle_percentage) * game.pong.speed * Math.cos(angle);
			else
				game.pong.velocity[0] = (1 + consts.PONG_ACCELERATION_ACUTE_ANGLE * max_angle_percentage) * game.pong.speed * -Math.cos(angle);
			game.pong.velocity[1] = (1 + consts.PONG_ACCELERATION_ACUTE_ANGLE * max_angle_percentage) * game.pong.speed * -Math.sin(angle);	
		}
	}
}

function collisionPaddle(player : Player, intersection_point : [number, number, string][]) : number {
	let paddle_side_hit :	[[number, number], [number, number]] = player.index === 1 ? 
							[player.rightUp(), player.rightDown()] : [player.leftUp(), player.leftDown()];
	let paddle_bot_hit : [[number, number], [number, number]] = [player.leftDown(), player.rightDown()];
	let paddle_top_hit : [[number, number], [number, number]] = [player.leftUp(), player.rightUp()];

	intersection_point[0] = getLineIntersection(game.pong.center(), game.pong.centerNextFrame(), paddle_side_hit[0], paddle_side_hit[1]);
	intersection_point[0][2] = "side";
	if (intersection_point[0][0] != -1)
		return relativeIntersection(intersection_point[0], paddle_side_hit[0], paddle_side_hit[1]);

	// ? Multiplying velocity vector by 3 for better precision in bot/top intersection
	intersection_point[0] = getLineIntersection(game.pong.center(), [game.pong.cX() + game.pong.velocity[0] * 3, game.pong.cY() + game.pong.velocity[1] * 3], paddle_bot_hit[0], paddle_bot_hit[1]);
	intersection_point[0][2] = "bot";
	if (intersection_point[0][0] != -1)
		return relativeIntersection(intersection_point[0], paddle_bot_hit[0], paddle_bot_hit[1]);

	intersection_point[0] = getLineIntersection(game.pong.center(), [game.pong.cX() + game.pong.velocity[0] * 3, game.pong.cY() + game.pong.velocity[1] * 3], paddle_top_hit[0], paddle_top_hit[1]);
	intersection_point[0][2] = "top";
	if (intersection_point[0][0] != -1)
		return relativeIntersection(intersection_point[0], paddle_top_hit[0], paddle_top_hit[1]);
	
	return 0;
}