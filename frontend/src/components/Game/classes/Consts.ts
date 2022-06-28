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
	
	original_map : GameMap;
	city_map : GameMap;
	casino_map : GameMap;

	FONT : any;
	RETURN_ICON : any;
	CROSS_ICON : any;
	CROSS_ICON2 : any;
	MARK_ICON : any;
	EYE_ICON : any;
	SOUND_ICON : any;
	CITY_BACKGROUND : any;
	TOKYO_BACKGROUND : any;

	PADDLE_HIT_1 : any;
	PADDLE_HIT_2 : any;

	BUMPER_HIT_1 : any;
	BUMPER_HIT_2 : any;
	
	WALL_HIT_1 : any;
	WALL_HIT_2 : any;

	BIP : any;
	BIP_FINAL : any;

	SCORE : any;

	CASINO_MUSIC : any;
	CITY_MUSIC : any;
	ORIGINAL_MUSIC : any;
	MENU_MUSIC : any;

	music_playing : string;
	max_volume : number;

	constructor() {
		this.WIDTH = 1200;
		this.HEIGHT = 750;

		this.original_map = new GameMap(1, this.WIDTH, this.HEIGHT);
		this.city_map = new GameMap(2, this.WIDTH, this.HEIGHT);
		this.casino_map = new GameMap(3, this.WIDTH, this.HEIGHT);
		this.resize();
		
		this.FONT = loadFont("/assets/fonts/PressStart2P-Regular.ttf");
		
		this.RETURN_ICON = loadImage("/assets/icons/return-button2.png");
		
		this.CROSS_ICON = createImg("/assets/icons/red-cross.png", "cross-icon");
		this.CROSS_ICON.size(this.small_square_diameter * 1.5, this.small_square_diameter * 1.5);

		this.CROSS_ICON2 = createImg("/assets/icons/red-cross.png", "cross-icon");
		this.CROSS_ICON2.size(this.small_square_diameter * 1.5, this.small_square_diameter * 1.5);
		
		this.MARK_ICON = createImg("/assets/icons/green-mark.png", "mark-icon");
		this.MARK_ICON.size(this.small_square_diameter * 1.7, this.small_square_diameter * 1.5);
	
		this.EYE_ICON = loadImage("/assets/icons/eye-icon.png");
		this.SOUND_ICON = loadImage("/assets/icons/sfx_icon.png");

		this.CITY_BACKGROUND = loadImage("/assets/backgrounds/city.jpg");
		this.TOKYO_BACKGROUND = loadImage("/assets/backgrounds/tokyo.png");

		this.PADDLE_HIT_1 = new Audio("/assets/sfx/paddle_hit_1.mp3");
		this.PADDLE_HIT_2 = new Audio("/assets/sfx/paddle_hit_2.mp3");

		this.BUMPER_HIT_1 = new Audio("/assets/sfx/bumper_hit_1.mp3");
		this.BUMPER_HIT_2 = new Audio("/assets/sfx/bumper_hit_2.mp3");

		this.WALL_HIT_1 = new Audio("/assets/sfx/wall_hit_1.mp3");
		this.WALL_HIT_2 = new Audio("/assets/sfx/wall_hit_2.mp3");

		this.BIP = new Audio("/assets/sfx/bip.mp3");
		this.BIP_FINAL = new Audio("/assets/sfx/bip-final.mp3");

		this.SCORE = new Audio("/assets/sfx/score.mp3");

		this.max_volume = 0.25;

		this.CASINO_MUSIC = new Audio("/assets/music/casino.mp3");
		this.CASINO_MUSIC.loop = true;
		this.CASINO_MUSIC.volume = this.max_volume;
		
		this.CITY_MUSIC = new Audio("/assets/music/city.mp3");
		this.CITY_MUSIC.loop = true;
		this.CITY_MUSIC.volume = this.max_volume;
		
		this.ORIGINAL_MUSIC = new Audio("/assets/music/original.mp3");
		this.ORIGINAL_MUSIC.loop = true;
		this.ORIGINAL_MUSIC.volume = this.max_volume;
		
		this.MENU_MUSIC = new Audio("/assets/music/menu.mp3");
		this.MENU_MUSIC.loop = true;
		this.MENU_MUSIC.volume = this.max_volume;

		this.music_playing = "none";
	}

	playBip(bip : any) {
		bip.currentTime = 0;
		bip.volume = this.max_volume;
		bip.play();
	}

	playScore() {
		this.SCORE.currentTime = 0;
		this.SCORE.volume = this.max_volume;
		this.SCORE.play();
	}

	playRandomPaddleSound() {
		this.PADDLE_HIT_1.volume = consts.max_volume;
		this.PADDLE_HIT_2.volume = consts.max_volume;

		let rand : number = Math.floor(Math.random() * 2);
		if (rand === 0)
			this.PADDLE_HIT_1.play();
		else if (rand === 1)
			this.PADDLE_HIT_2.play();
	}
	
	playRandomWallSound() {
		this.WALL_HIT_1.volume = consts.max_volume;
		this.WALL_HIT_2.volume = consts.max_volume;

		let rand : number = Math.floor(Math.random() * 2);
		if (rand === 0)
			this.WALL_HIT_1.play();
		else if (rand === 1)
			this.WALL_HIT_2.play();
	}
	
	playRandomBumperSound() {
		this.BUMPER_HIT_1.volume = consts.max_volume;
		this.BUMPER_HIT_2.volume = consts.max_volume;

		let rand : number = Math.floor(Math.random() * 2);
		if (rand === 0)
			this.BUMPER_HIT_1.play();
		else if (rand === 1)
			this.BUMPER_HIT_2.play();
	}

	musicPlaying() : any {
		if (this.music_playing === "menu")
			return this.MENU_MUSIC;
		else if (this.music_playing === "casino")
			return this.CASINO_MUSIC;
		else if (this.music_playing === "city")
			return this.CITY_MUSIC;
		else if (this.music_playing === "original")
			return this.ORIGINAL_MUSIC;
		else
			return "none"
	}

	fadeMusicDown(music : any) {
		music.pause();
		// for (let i = 0; i < 10; i++) {
		// 	setTimeout(() => {
		// 		if (music.volume >= 0.1)
		// 			music.volume -= 0.1;
		// 		if (i === 9)
		// 			music.pause();
		// 	}, i * 200);
		// }
	}
	
	fadeMusicUp(music : any) {
		music.currentTime = 0;
		music.volume = this.max_volume;
		music.play();
		// music.volume = 0;
		// for (let j = 0; j < 10; j++) {
		// 	setTimeout(() => {
		// 		if (music.volume <= 0.9)
		// 			music.volume += 0.1;
		// 		if (j === 9)
		// 			music.volume = 1;
		// 	}, j * 200);
		// }
	}

	switchMusic(music : string) {
		let tmp_music = this.musicPlaying();
		if (tmp_music != "none") {
			if (music === "menu") {
				this.fadeMusicDown(tmp_music);
				this.fadeMusicUp(this.MENU_MUSIC);
			}
			else if (music === "original") {
				this.fadeMusicDown(tmp_music);
				this.fadeMusicUp(this.ORIGINAL_MUSIC);
			}
			else if (music === "city") {
				this.fadeMusicDown(tmp_music);
				this.fadeMusicUp(this.CITY_MUSIC);
			}
			else if (music === "casino") {
				this.fadeMusicDown(tmp_music);
				this.fadeMusicUp(this.CASINO_MUSIC);
			}
			if (music === "none")
				this.fadeMusicDown(tmp_music);
			this.music_playing = music;
		}
		else {
			if (music === "menu")
				this.fadeMusicUp(this.MENU_MUSIC);
			else if (music === "original")
				this.fadeMusicUp(this.ORIGINAL_MUSIC);
			else if (music === "city")
				this.fadeMusicUp(this.CITY_MUSIC);
			else if (music === "casino")
				this.fadeMusicUp(this.CASINO_MUSIC);
			this.music_playing = music;
		}
	}

	playAppropriateMusic() {
		if ((game.state === "countdown" ||game.state  === "spectate" || game.state === "in-game" || game.state === "waiting-readiness" || game.state === "waiting-player") && this.music_playing === "menu")
			this.switchMusic(game.map.name);
		else if ((game.state === "in-menu" || game.state === "in-menu-create" || game.state === "in-menu-input") && this.music_playing != "menu")
			this.switchMusic("menu");
		// else if ((game.state === "game-over" || game.state === "opponent-left-menu") && this.music_playing != "none")
		// 	this.switchMusic("none");
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
		this.PLAYER_SPEED = this.DIAGONAL / 125;

		this.PONG_DIAMETER = this.DIAGONAL / 120;
		this.PONG_BASE_SPEED = this.DIAGONAL / 150;
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

		this.original_map.resize(this.WIDTH , this.HEIGHT);
		this.city_map.resize(this.WIDTH , this.HEIGHT);
		this.casino_map.resize(this.WIDTH , this.HEIGHT);

		// if (this.RETURN_ICON)
		// 	this.RETURN_ICON.size(this.medium_square_diameter, this.medium_square_diameter);
		if (this.CROSS_ICON)
			this.CROSS_ICON.size(this.small_square_diameter * 1.5, this.small_square_diameter * 1.5);
		if (this.CROSS_ICON2)
			this.CROSS_ICON2.size(this.small_square_diameter * 1.5, this.small_square_diameter * 1.5);
		if (this.MARK_ICON)
			this.MARK_ICON.size(this.small_square_diameter * 1.7, this.small_square_diameter * 1.5);
	
		this.TOP_BOUND = this.original_map.wall_width * 2;
		this.BOT_BOUND = this.HEIGHT - this.original_map.wall_width * 2;
		this.LEFT_BOUND = 0;
		this.RIGHT_BOUND = this.WIDTH;
	}
}