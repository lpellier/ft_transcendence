class GameMap {
	walls : [[number, number], [number, number], [number, number], [number, number]][]; // [pos_x, pos_y], [width, height], outer1, outer2
	index : number;

	constructor(index : number) {
		this.index = index;
		if (index === 1)
			this.defaultMap();
		else if (index === 2)
			this.hardMap();
	}

	defaultMap() {
		this.walls =	[[[5, 5], [consts.WIDTH - 10, 5], [5, 10], [consts.WIDTH - 5, 10]], 
						[[5, consts.HEIGHT - 10], [consts.WIDTH - 10, 5], [5, consts.HEIGHT - 10], [consts.WIDTH - 5, consts.HEIGHT - 10]]];	
	}

	hardMap() {
		this.walls =	[[[5, 5], [consts.WIDTH - 10, 5], [10, 10], [consts.WIDTH - 10, 10]], 
		[[5, consts.HEIGHT - 10], [consts.WIDTH - 10, 5], [10, consts.HEIGHT - 10], [consts.WIDTH - 10, consts.HEIGHT - 10]],
						[[5, 5], [5, consts.HEIGHT / 3 - 5], [10, 10], [10, consts.HEIGHT / 3]],
						[[5, consts.HEIGHT * 2 / 3], [5, consts.HEIGHT / 3 - 5], [10, consts.HEIGHT * 2 / 3], [10, consts.HEIGHT - 10]],
						[[consts.WIDTH - 10, 5], [5, consts.HEIGHT / 3 - 5], [consts.WIDTH - 10, 10], [consts.WIDTH - 10, consts.HEIGHT / 3]],
						[[consts.WIDTH - 10, consts.HEIGHT * 2 / 3], [5, consts.HEIGHT / 3 - 5], [consts.WIDTH - 10, consts.HEIGHT * 2 / 3], [consts.WIDTH - 10, consts.HEIGHT - 10]]];	
	} 

	render() {
		background(0);
		push();
		noStroke();
		fill("white");
		textSize(14);
		text("Room #" + game.room_id, 16, 25); // room id
		for (let i : number = consts.TOP_BOUND; i < consts.BOT_BOUND; i += 20)
			rect(consts.WIDTH / 2, i, 5, 10); // line in the middle
		for (const wall of this.walls) // bounds
			rect(wall[0][0], wall[0][1], wall[1][0], wall[1][1]);
		textSize(consts.std_font_size);
		push();
		fill((game.score[0] > game.score[1] ? "white" : "grey")); // highlight better score
		if (game.score[0].toString().length > 1)
			text(game.score[0], consts.WIDTH / 2 - consts.WIDTH / 10, consts.HEIGHT / 9); // score
		else
			text(game.score[0], consts.WIDTH / 2 - consts.WIDTH / 16, consts.HEIGHT / 9); // score
		pop();
		push();
		fill((game.score[1] > game.score[0] ? "white" : "grey"));
		text(game.score[1], consts.WIDTH / 2 + consts.WIDTH / 30, consts.HEIGHT / 9); // score
		pop();
		pop();	
	}

	resize() {
		if (this.index === 1)
			this.defaultMap();
		else if (this.index === 2)
			this.hardMap();
	}
};
