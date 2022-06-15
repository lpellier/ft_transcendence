class Player {
	pos : [number, number] = [0, 0];
	velocity : [number, number] = [0, 0];
	width : number = consts.PLAYER_WIDTH;
	height : number = consts.PLAYER_HEIGHT;
	color : string = "white";
	index : number = 0;
	id : string = "0";
	ready : boolean = false;

	constructor(index : number, id : any) {
		if (index == 1)
			this.pos = [consts.WIDTH / 12, consts.HEIGHT / 2 - consts.PLAYER_HEIGHT / 2];
		else
			this.pos = [consts.WIDTH * 11 / 12, consts.HEIGHT / 2 - consts.PLAYER_HEIGHT / 2];

		this.velocity = [0, 0];
		this.width = consts.PLAYER_WIDTH;
		this.height = consts.PLAYER_HEIGHT;
		this.color = game.map.object_color;
		this.index = index;
		this.id = id;
		this.ready = false;
	}
	
	render() {
		push();
		noStroke();
		fill(this.color);
		rect(this.pos[0], this.pos[1], this.width, this.height);
		pop();
	}
	
	resize() {
		let proportionnal_y = this.pos[1] / consts.OLD_HEIGHT;
		this.width = consts.PLAYER_WIDTH;
		this.height = consts.PLAYER_HEIGHT;
		if (this.index == 1)
			this.pos = [consts.WIDTH / 12, consts.HEIGHT * proportionnal_y];
		else
			this.pos = [consts.WIDTH * 11 / 12, consts.HEIGHT * proportionnal_y];
	}

	calculateNewPos() {
		this.pos[1] += this.velocity[1];
		if (this.pos[1] < 10) // 10 for boundaries
			this.pos[1] = 10;
		if (this.pos[1] + this.height > consts.HEIGHT - 10) // -10 for boundaries
			this.pos[1] = consts.HEIGHT - 10 - this.height;
	}
	
	distanceTo(point : [number, number]) : number {
		let dist : number = Math.sqrt(Math.pow((point[0] - (this.pos[0] + this.width / 2)), 2) + Math.pow((point[1] - (this.pos[1] + this.height / 2)), 2));

		return dist;
	}

	moveUp() {
		this.velocity[1] = -consts.PLAYER_SPEED;
		this.calculateNewPos();
	}

	moveDown() {
		this.velocity[1] = consts.PLAYER_SPEED;
		this.calculateNewPos();
	}

	leftUp() : [number, number] {
		return [this.pos[0], this.pos[1]];
	}

	leftDown() : [number, number] {
		return [this.pos[0], this.pos[1] + this.height]
	}

	rightUp() : [number, number] {
		return [this.pos[0] + this.width, this.pos[1]];
	}

	rightDown() : [number, number] {
		return [this.pos[0] + this.width, this.pos[1] + this.height];
	}
}
