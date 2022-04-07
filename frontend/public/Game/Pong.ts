class Pong {
	pos : [number, number];
	velocity : [number, number];
	diameter : number;
	speed : number;
	color : string;

	constructor() {
		this.pos = [MAP_WIDTH / 2 - PONG_DIAMETER / 2, MAP_HEIGHT / 2 - PONG_DIAMETER / 2];
		let random_y = Math.random() < 0.5 ? -1 : 1;
		let random_x = Math.floor(Math.random() * 2);
		this.speed = 4;
		if (random_x == 0)
			this.velocity = [-this.speed, random_y];
		else
			this.velocity = [this.speed, random_y];
		this.diameter = PONG_DIAMETER;
		this.color = PONG_COLOR;
	}

	calculateNewPos() {
		this.pos[0] += this.velocity[0];
		this.pos[1] += this.velocity[1];
	}

	relaunchPong(loser_side : string) {
		this.pos = [MAP_WIDTH / 2 - PONG_DIAMETER / 2, MAP_HEIGHT / 2 - PONG_DIAMETER / 2];
		this.speed = 4;
		let random_y = Math.random() < 0.5 ? -1 : 1;

		// ? Comment allows for testing horizontal collisions
		// this.pos = random_y == 1 ? [65, 450] : [60, 50];
		// this.velocity = random_y == 1 ? [0, -this.speed] : [0, this.speed];
		if (loser_side == "left")
			this.velocity = [-this.speed, random_y];
		else if (loser_side == "right")
			this.velocity = [this.speed, random_y];
	}

	left_up() : [number, number] {
		return [this.pos[0], this.pos[1]];
	}

	left_down() : [number, number] {
		return [this.pos[0], this.pos[1] + this.diameter]
	}

	right_up() : [number, number] {
		return [this.pos[0] + this.diameter, this.pos[1]];
	}

	right_down() : [number, number] {
		return [this.pos[0] + this.diameter, this.pos[1] + this.diameter];
	}

	left() : [number, number] {
		return [this.pos[0], this.c_y()];
	}

	right() : [number, number] {
		return [this.pos[0] + this.diameter, this.c_y()];
	}

	up() : [number, number] {
		return [this.c_x(), this.pos[1]];
	}

	down() : [number, number] {
		return [this.c_x(), this.pos[1] + this.diameter];
	}

	ball_moves(x : number, y : number) : [number, number] {
		return [x + this.velocity[0], y + this.velocity[1]];
	}
	
	c_x() : number {
		return this.pos[0] + this.diameter / 2 ;
	}

	c_y() : number {
		return this.pos[1] + this.diameter + 2;
	}

	render() {
		push();
		noStroke();
		fill(this.color);
		rect(this.pos[0], this.pos[1], this.diameter, this.diameter);
		pop();
	}
}
