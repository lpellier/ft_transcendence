class Player {
	pos : [number, number] = [0, 0];
	velocity : [number, number] = [0, 0];
	width : number = consts.PLAYER_WIDTH;
	height : number = consts.PLAYER_HEIGHT;
	color : string = "white";
	index : number = 0;
	id : string = "0";
	ready : boolean = false;

	constructor(pos_x : number, pos_y : number, width : number, height : number, color : string, index : number, id : any) {
		this.pos = [pos_x, pos_y];
		this.velocity = [0, 0];
		this.width = width;
		this.height = height;
		this.color = color;
		this.index = index;
		this.id = id;
		this.ready = false;
	}
	
	render() {
		// if (player_input.length > 0) {
		// 	(player_input[0] == 1 ? this.move_up() : (player_input[0] == -1 ? this.move_down() : 0));
		// 	player_input.splice(0, 1);
		// }
		for (const p_input of player_input) {
			(p_input == 1 ? game.players[0].move_up() : (p_input == -1 ? game.players[0].move_down() : 0));
		}
		push();
		noStroke();
		fill(this.color);
		rect(this.pos[0], this.pos[1], this.width, this.height);
		pop();
	}
	
	calculateNewPos() {
		this.pos[1] += this.velocity[1];
		if (this.pos[1] < 10) // 10 for boundaries
			this.pos[1] = 10;
		if (this.pos[1] + this.height > consts.MAP_HEIGHT - 10) // -10 for boundaries
			this.pos[1] = consts.MAP_HEIGHT - 10 - this.height;
	}

	move_up() {
		this.velocity[1] = -consts.PLAYER_SPEED;
		this.calculateNewPos();
	}

	move_down() {
		this.velocity[1] = consts.PLAYER_SPEED;
		this.calculateNewPos();
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