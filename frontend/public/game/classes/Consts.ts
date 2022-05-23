class Consts {
	WIDTH : number;
	HEIGHT : number;
	DIAGONAL : number;

	OLD_WIDTH : number;
	OLD_HEIGHT : number;

	PLAYER_WIDTH : number;
	PLAYER_HEIGHT : number;
	PLAYER_SPEED : number;
	
	PONG_DIAMETER : number;
	PONG_BASE_SPEED : number;
	PONG_MAX_SPEED : number;
	PONG_ACCELERATION : number;
	PONG_ACCELERATION_ACUTE_ANGLE : number;
	PONG_COLOR : string;
	
	TOP_BOUND : number;
	BOT_BOUND : number;
	LEFT_BOUND : number;
	RIGHT_BOUND : number;

	std_font_size : number;
	medium_font_size : number;
	small_font_size : number;

	std_width : number;
	std_height : number;
	medium_width : number;
	medium_height : number;

	medium_square_diameter : number;
	small_square_diameter : number;
	
	FONT : any;
	RETURN_ICON : any;
	CROSS_ICON : any;
	CROSS_ICON2 : any;
	MARK_ICON : any;
	
	constructor() {
		this.resize();
		
		this.FONT = loadFont("/assets/fonts/PressStart2P-Regular.ttf");
		
		this.RETURN_ICON = createImg("/assets/icons/return-button2.png", "return-icon");
		this.RETURN_ICON.parent(document.getElementById("icon-return"));
		this.RETURN_ICON.size(this.medium_square_diameter, this.medium_square_diameter);
		
		this.CROSS_ICON = createImg("/assets/icons/red-cross.png", "cross-icon");
		this.CROSS_ICON.size(this.small_square_diameter * 1.5, this.small_square_diameter * 1.5);

		this.CROSS_ICON2 = createImg("/assets/icons/red-cross.png", "cross-icon");
		this.CROSS_ICON2.size(this.small_square_diameter * 1.5, this.small_square_diameter * 1.5);
		
		this.MARK_ICON = createImg("/assets/icons/green-mark.png", "mark-icon");
		this.MARK_ICON.size(this.small_square_diameter * 1.7, this.small_square_diameter * 1.5);
	}

	setWindowSize() {
		this.OLD_WIDTH = this.WIDTH;
		this.OLD_HEIGHT = this.HEIGHT;
	
		this.WIDTH = windowWidth * 5 / 6;
		this.HEIGHT = this.WIDTH / 1.6;

		if (this.HEIGHT > windowHeight) {
			this.HEIGHT = windowHeight * 5 / 6;
			this.WIDTH = this.HEIGHT * 1.6;
		}
		this.DIAGONAL = Math.sqrt(Math.pow(this.WIDTH, 2) + Math.pow(this.HEIGHT, 2));
	}

	resize() {
		this.setWindowSize();

		this.PLAYER_WIDTH = this.WIDTH / 80;
		this.PLAYER_HEIGHT = this.HEIGHT / 9;
		this.PLAYER_SPEED = this.DIAGONAL / 200;

		this.PONG_DIAMETER = this.DIAGONAL / 120;
		this.PONG_BASE_SPEED = this.PLAYER_SPEED;
		this.PONG_MAX_SPEED = this.PONG_BASE_SPEED * 2;
		this.PONG_ACCELERATION = this.PONG_BASE_SPEED / 2800;
		this.PONG_ACCELERATION_ACUTE_ANGLE = this.PONG_BASE_SPEED / 28;
		this.PONG_COLOR = "white";

		
		this.std_width = this.WIDTH / 4;
		this.std_height = this.HEIGHT / 4;
		this.medium_width = this.WIDTH / 3.5;
		this.medium_height = this.HEIGHT / 10;

		this.std_font_size = (Math.sqrt(Math.pow(this.std_width, 2) + Math.pow(this.std_height, 2)) / 8);
		this.medium_font_size = (Math.sqrt(Math.pow(this.medium_width, 2) + Math.pow(this.medium_height, 2)) / 14);
		this.small_font_size = (Math.sqrt(Math.pow(this.small_square_diameter, 2) + Math.pow(this.small_square_diameter, 2)) / 1.7);
		
		this.medium_square_diameter = this.DIAGONAL / 14;
		this.small_square_diameter = this.DIAGONAL / 28;

		if (this.RETURN_ICON)
			this.RETURN_ICON.size(this.medium_square_diameter, this.medium_square_diameter);
		if (this.CROSS_ICON)
			this.CROSS_ICON.size(this.small_square_diameter * 1.5, this.small_square_diameter * 1.5);
		if (this.CROSS_ICON2)
			this.CROSS_ICON2.size(this.small_square_diameter * 1.5, this.small_square_diameter * 1.5);
		if (this.MARK_ICON)
			this.MARK_ICON.size(this.small_square_diameter * 1.7, this.small_square_diameter * 1.5);

		this.TOP_BOUND = 10;
		this.BOT_BOUND = this.HEIGHT - 10;
		this.LEFT_BOUND = 0;
		this.RIGHT_BOUND = this.WIDTH;
	}
}