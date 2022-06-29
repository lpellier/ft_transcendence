class GameMap {
	walls : [[number, number], [number, number], [number, number], [number, number]][]; // [pos_x, pos_y], [width, height], outer1, outer2
	index : number;
	width : number;
	height : number;

	wall_width : number;
	background : any;
	object_color : string;
	name : string;

	constructor(index : number, w : number, h : number) {
		this.index = index;
		this.name = "original";
		this.resize(w, h);
	}

	originalMap() {
		this.object_color = "white";
		this.background = null;
	}

	cityMap() {
		this.object_color = "#ffffff";
		if (consts)
			this.background = consts.CITY_BACKGROUND;	
	} 

	casinoMap() {
		this.object_color = "#ffffff";
		if (consts)
			this.background = consts.TOKYO_BACKGROUND;
	}

	render(ratio : number) {
		let map_width = this.width * ratio;
		let map_height = this.height * ratio;
		let top_bound = map_height / 75;
		let bot_bound = map_height - map_height / 75;

		push();
		noStroke();
		if (this.background)
			image(this.background, 0, 0, map_width, map_height);

		push();
		fill("rgba(0, 0, 0, 0.60)");
		rect(0, 0, map_width, map_height);
		pop();
		fill(this.object_color);
		if (ratio === 1) {
			push();
			fill("rgba(255, 255, 255, 0.6)");
			textSize(consts.small_font_size / 2);
			text("Room #" + game.room_id, consts.WIDTH * 0.02, consts.HEIGHT * 0.03 + consts.small_font_size / 2); // room id
			outputScore(map_width, map_height);
			pop();
		}
		
		push();
		stroke(this.object_color);
		for (let i : number = top_bound; i < bot_bound; i += this.wall_width * 8 * ratio)
			rect(map_width / 2, i, this.wall_width * ratio, this.wall_width * 2 * ratio); // line in the middle
		for (const wall of this.walls) // bounds
			rect(wall[0][0] * ratio, wall[0][1] * ratio, wall[1][0] * ratio, wall[1][1] * ratio);
		pop();
		pop();
		if (this.name === "city")
			for (let bumper of bumpers)
				bumper.render(ratio);

	}

	resize(w : number, h : number) {
		this.width = w;
		this.height = h;
		this.wall_width = this.width / 240;
		this.walls =	[
			[[this.wall_width, this.wall_width], [this.width - this.wall_width * 2, this.wall_width], [this.wall_width, this.wall_width * 2], [this.width - this.wall_width, this.wall_width * 2]], 
			[[this.wall_width, this.height - this.wall_width * 2], [this.width - this.wall_width * 2, this.wall_width], [this.wall_width, this.height - this.wall_width * 2], [this.width - this.wall_width, this.height - this.wall_width * 2]]
		];
		if (this.index === 1)
			this.originalMap();
		else if (this.index === 2) {
			this.name = "city";
			this.cityMap();
		}
		else if (this.index === 3) {
			this.name = "casino";
			this.casinoMap();
		}
	}
};
