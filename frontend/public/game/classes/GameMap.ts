class GameMap {
	width : number;
	height : number;
	walls : [[number, number], [number, number], [number, number], [number, number]][]; // [pos_x, pos_y], [width, height], outer1, outer2
	
	constructor(width : number, height : number, walls : [[number, number], [number, number], [number, number], [number, number]][]) {
		this.width = width;
		this.height = height;
		this.walls = walls;
	}

	defaultMap() {
		this.width = consts.MAP_WIDTH;
		this.height = consts.MAP_HEIGHT;
		this.walls =	[[[5, 5], [this.width - 10, 5], [5, 10], [this.width - 5, 10]], 
						[[5, this.height - 10], [this.width - 10, 5], [5, this.height - 10], [this.width - 5, this.height - 10]]];	
	}

	hardMap() {
		this.width = consts.MAP_WIDTH;
		this.height = consts.MAP_HEIGHT;
		this.walls =	[[[5, 5], [this.width - 10, 5], [10, 10], [this.width - 10, 10]], 
		[[5, this.height - 10], [this.width - 10, 5], [10, this.height - 10], [this.width - 10, this.height - 10]],
						[[5, 5], [5, this.height / 3 - 5], [10, 10], [10, this.height / 3]],
						[[5, this.height * 2 / 3], [5, this.height / 3 - 5], [10, this.height * 2 / 3], [10, this.height - 10]],
						[[this.width - 10, 5], [5, this.height / 3 - 5], [this.width - 10, 10], [this.width - 10, this.height / 3]],
						[[this.width - 10, this.height * 2 / 3], [5, this.height / 3 - 5], [this.width - 10, this.height * 2 / 3], [this.width - 10, this.height - 10]]];	
	} 

	render() {
		background(0);
		push();
		noStroke();
		fill("white");
		textSize(14);
		text("Room #" + game.room_id, 16, 25); // room id
		for (let i : number = consts.TOP_BOUND; i < consts.BOT_BOUND; i += 20)
			rect(this.width / 2, i, 5, 10); // line in the middle
		for (const wall of this.walls) // bounds
			rect(wall[0][0], wall[0][1], wall[1][0], wall[1][1]);
		textSize(50);
		push();
		fill((game.score[0] > game.score[1] ? "white" : "grey")); // highlight better score
		if (game.score[0].toString().length > 1)
			text(game.score[0], this.width / 2 - 120, 90); // score
		else
			text(game.score[0], this.width / 2 - 70, 90); // score
		pop();
		push();
		fill((game.score[1] > game.score[0] ? "white" : "grey"));
		text(game.score[1], this.width / 2 + 35, 90); // score
		pop();
		pop();	
	}
};
