import * as consts from "./Consts"

export class GameMap {
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
};
