class Player {
	pos : [number, number];
	width : number;
	height : number;
	color : string;
	index : number;
	id : any;
	ready : boolean;

	constructor(pos_x : number, pos_y : number, width : number, height : number, color : string, index : number, id : any) {
		this.pos = [pos_x, pos_y];
		this.width = width;
		this.height = height;
		this.color = color;
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
	
	move_up() {
		this.pos[1] -= consts.PLAYER_SPEED;
		if (this.pos[1] < 10) // 10 for boundaries
			this.pos[1] = 10;
	}

	move_down() {
		this.pos[1] += consts.PLAYER_SPEED;
		if (this.pos[1] + this.height > consts.MAP_HEIGHT - 10) // -10 for boundaries
			this.pos[1] = consts.MAP_HEIGHT - 10 - this.height;
	}

	left_up() : [number, number] {
		return [this.pos[0], this.pos[1]];
	}

	left_down() : [number, number] {
		return [this.pos[0], this.pos[1] + this.height]
	}

	right_up() : [number, number] {
		return [this.pos[0] + this.width, this.pos[1]];
	}

	right_down() : [number, number] {
		return [this.pos[0] + this.width, this.pos[1] + this.height];
	}
}
