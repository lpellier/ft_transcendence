class Consts {
	PLAYER_WIDTH : number;
	PLAYER_HEIGHT : number;
	PLAYER_SPEED : number;
	
	PONG_DIAMETER : number;
	PONG_BASE_SPEED : number;
	PONG_MAX_SPEED : number;
	PONG_ACCELERATION : number;
	PONG_ACCELERATION_ACUTE_ANGLE : number;
	PONG_COLOR : string;
	
	MAP_WIDTH : number;
	MAP_HEIGHT : number;
	TOP_BOUND : number;
	BOT_BOUND : number;
	LEFT_BOUND : number;
	RIGHT_BOUND : number;
	
	FONT : any;
	RETURN_ICON : any;
	CROSS_ICON : any;
	CROSS_ICON2 : any;
	MARK_ICON : any;

	constructor() {
		this.PLAYER_WIDTH = 15;
		this.PLAYER_HEIGHT = 80;
		this.PLAYER_SPEED = 7;

		this.PONG_DIAMETER = 12;
		this.PONG_BASE_SPEED = 6;
		this.PONG_MAX_SPEED = 14;
		this.PONG_ACCELERATION = 0.0025;
		this.PONG_ACCELERATION_ACUTE_ANGLE = 0.25;
		this.PONG_COLOR = "white";

		this.MAP_WIDTH = 1200;
		this.MAP_HEIGHT = 750;

		this.TOP_BOUND = 10;
		this.BOT_BOUND = this.MAP_HEIGHT - 10;
		this.LEFT_BOUND = 0;
		this.RIGHT_BOUND = this.MAP_WIDTH;
		
		this.FONT = loadFont("/assets/fonts/PressStart2P-Regular.ttf");
		
		this.RETURN_ICON = createImg("/assets/icons/return-button2.png", "return-icon");
		this.RETURN_ICON.size(100, 100);
		this.RETURN_ICON.parent(document.getElementById("icon-return"));
		
		this.CROSS_ICON = createImg("/assets/icons/red-cross.png", "cross-icon");
		this.CROSS_ICON.size(75, 75);

		this.CROSS_ICON2 = createImg("/assets/icons/red-cross.png", "cross-icon");
		this.CROSS_ICON2.size(75, 75);
		
		this.MARK_ICON = createImg("/assets/icons/green-mark.png", "mark-icon");
		this.MARK_ICON.size(90, 75);
	}
}