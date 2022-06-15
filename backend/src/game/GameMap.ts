import * as consts from "./Consts"

export class GameMap {
	walls : [[number, number], [number, number], [number, number], [number, number]][]; // [pos_x, pos_y], [width, height], outer1, outer2
	index : number;
	width : number;
	height : number;
	name: string;

	constructor(index : number, w : number, h : number) {
		this.index = index;
		this.width = w;
		this.height = h;
		this.name = "original";
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

	originalMap() {
		this.walls =	[
						[[5, 5], [this.width - 10, 5], [5, 10], [this.width - 5, 10]], 
						[[5, this.height - 10], [this.width - 10, 5], [5, this.height - 10], [this.width - 5, this.height - 10]]
					];	
	}

	cityMap() {
		this.walls =	[
						[[5, 5], [this.width - 10, 5], [5, 10], [this.width - 5, 10]], 
						[[5, this.height - 10], [this.width - 10, 5], [5, this.height - 10], [this.width - 5, this.height - 10]],
						[[this.width / 2, this.height / 5], [5, this.height / 5], [0, 0], [0, 0]],
						[[this.width / 2, this.height * 3/ 5], [5, this.height / 5], [0, 0], [0, 0]],
					];
	} 

	casinoMap() {
		this.walls =	[
						[[5, 5], [this.width - 10, 5], [5, 10], [this.width - 5, 10]], 
						[[5, this.height - 10], [this.width - 10, 5], [5, this.height - 10], [this.width - 5, this.height - 10]]
					];	
	}
};
