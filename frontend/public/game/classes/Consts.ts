class Consts {
	PLAYER_WIDTH : number;
	PLAYER_HEIGHT : number;
	PLAYER_SPEED : number;
	
	PONG_DIAMETER : number;
	PONG_BASE_SPEED : number;
	PONG_MAX_SPEED : number;
	PONG_COLOR : string;
	
	MAP_WIDTH : number;
	MAP_HEIGHT : number;
	TOP_BOUND : number;
	BOT_BOUND : number;
	LEFT_BOUND : number;
	RIGHT_BOUND : number;
	
	FONT : any;
	RETURN_ICON : any;

	constructor() {
		this.PLAYER_WIDTH = 15;
		this.PLAYER_HEIGHT = 80;

		this.PONG_DIAMETER = 12;
		this.PONG_BASE_SPEED = 6;
		this.PONG_MAX_SPEED = 12;
		this.PONG_COLOR = "white";

		this.MAP_WIDTH = 1200;
		this.MAP_HEIGHT = 750;
		this.PLAYER_SPEED = 7;

		this.TOP_BOUND = 10;
		this.BOT_BOUND = this.MAP_HEIGHT - 10;
		this.LEFT_BOUND = 0;
		this.RIGHT_BOUND = this.MAP_WIDTH;
	}
}