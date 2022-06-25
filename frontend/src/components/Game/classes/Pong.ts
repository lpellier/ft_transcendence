class Pong {
	pos : [number, number];
	velocity : [number, number];
	diameter : number;
	speed : number;
	color : string;
	value: number;

	constructor() {
		this.pos = [consts.WIDTH / 2 - consts.PONG_DIAMETER / 2, consts.HEIGHT / 2 - consts.PONG_DIAMETER / 2];
		this.diameter = consts.PONG_DIAMETER;
		this.color = game.map.object_color;
		this.value = 1;

		let side = Math.random() < 0.5 ? "left" : "right";
		this.relaunchPong(side);
	}

	calculateNewPos() {
		this.pos[0] += this.velocity[0];
		this.pos[1] += this.velocity[1]
		checkCollisions();
	}

	resize() {
		let proportionnal_x : number = this.pos[0] / consts.OLD_WIDTH;
		let proportionnal_y : number = this.pos[1] / consts.OLD_HEIGHT;
		this.diameter = consts.PONG_DIAMETER;
		this.pos = [consts.WIDTH * proportionnal_x, consts.HEIGHT * proportionnal_y];
	}

	relaunchPong(loser_side : string) {
		this.pos = [consts.WIDTH / 2 - consts.PONG_DIAMETER / 2, consts.HEIGHT / 2 - consts.PONG_DIAMETER / 2];
		this.speed = consts.PONG_BASE_SPEED;
		let random_y = Math.random() < 0.5 ? -1 : 1;

		if (loser_side === "left")
			this.velocity = [-this.speed, random_y];
		else if (loser_side === "right")
			this.velocity = [this.speed, random_y];
		this.setNewValue();
	}

	setNewValue() { // values (0 -> -1) (1 - 4 -> 1) (5 - 7 -> 2) (8 - 9 -> 3) (10 -> 4)
		if (game.map.name != "casino")
			return ;
		let rand : number = Math.floor(Math.random() * 11);
		if (rand === 0)
			this.value = -1;
		else if (rand <= 4)
			this.value = 1;
		else if (rand <= 7)
			this.value = 2;
		else if (rand <= 9)
			this.value = 3;
		else if (rand === 10)
			this.value = 4;
	}

	leftUp() : [number, number] {
		return [this.pos[0], this.pos[1]];
	}

	leftDown() : [number, number] {
		return [this.pos[0], this.pos[1] + this.diameter]
	}

	rightUp() : [number, number] {
		return [this.pos[0] + this.diameter, this.pos[1]];
	}

	rightDown() : [number, number] {
		return [this.pos[0] + this.diameter, this.pos[1] + this.diameter];
	}

	left() : [number, number] {
		return [this.pos[0], this.cY()];
	}

	right() : [number, number] {
		return [this.pos[0] + this.diameter, this.cY()];
	}

	up() : [number, number] {
		return [this.cX(), this.pos[1]];
	}

	down() : [number, number] {
		return [this.cX(), this.pos[1] + this.diameter];
	}

	ballMoves(pos : [number, number]) : [number, number] {
		return [pos[0] + this.velocity[0], pos[1] + this.velocity[1]];
	}
	
	cX() : number {
		return this.pos[0] + this.diameter / 2;
	}

	cY() : number {
		return this.pos[1] + this.diameter / 2;
	}

	center() : [number, number] {
		return [this.cX(), this.cY()];
	}

	centerNextFrame() : [number, number] {
		return [this.cX() + this.velocity[0], this.cY() + this.velocity[1]];
	}

	
	render() {
		if (this.value === -1)
			this.color = "#80ff80" // green
		if (this.value === 1)
			this.color = "white";
		else if (this.value === 2)
			this.color = "#ffff4d"; // yellow
		else if (this.value === 3)
			this.color = "#ffa64d"; // orange
		else if (this.value === 4)
			this.color = "#ff4d4d"; // red
		push();
		noStroke();
		fill(this.color);
		rect(this.pos[0], this.pos[1], this.diameter, this.diameter);
		pop();
	}
}
