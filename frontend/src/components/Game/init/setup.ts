// ? P to quit local mode
// ? Coding consistency : snake_case for variables | camelCase for functions | PascalCase for classes
// ? Map indexes : 1 (normal map), 2 (city map), 3 (casino map)

// ? output both player names at start of match and winner name at the end

// ? add off/on button for sfx and music

// sometimes weird thing keeps my paddle moving

// TODO cute animation showing the roll of pong value in casino
// TODO comment EVERYTHING

let spritesheet : any;
let spritedata : any;

let animation : any[] = [];
let bumpers : any[] = [];

let should_load : boolean = false;

let consts : Consts = null;
let game : Game = null;
let errors : Errors = null;
let buttons : Buttons = null;
let inputs : Inputs = null;
let keys : Keys = null;

let canvas : any = null;
let socket : any = null;

let user_name : string;
let user_id : string;

function preload() {
	// soundFormats("mp3");
	consts = new Consts();
	keys = new Keys();

	spritedata = loadJSON('/assets/sprites/bumper.json');
  	spritesheet = loadImage('/assets/sprites/bumper.png');
}

function setup() {
	let frames = spritedata.frames;
	for (let i = 0; i < frames.length; i++) {
		let pos = frames[i].position;
		let img = spritesheet.get(pos.x, pos.y, pos.w, pos.h);
		for (let j = 0; j < frames[i].time; j++)
			animation.push(img);
	}
	let diameter = consts.DIAGONAL * 0.10;

	bumpers.push(new Bumper(animation, consts.WIDTH / 2 - diameter / 2, consts.HEIGHT * 1 / 4 - diameter / 2, diameter, 1));
	bumpers.push(new Bumper(animation, consts.WIDTH / 2 - diameter / 2, consts.HEIGHT * 3 / 4 - diameter / 2, diameter, 2));

	keys.init();
	game = new Game();
	inputs = new Inputs();
	errors = new Errors();
	buttons = new Buttons();
	
	user_name = document.getElementById("user").getAttribute("user_name");
	user_id = document.getElementById("user").getAttribute("user_id");

	canvas = createCanvas(consts.WIDTH, consts.HEIGHT);
	canvas.parent(document.getElementById("canvas-parent"));
	background(0);
	textFont(consts.FONT);
	frameRate(60);
	
	// @ts-ignore:next-line
	socket = io("http://127.0.0.1:3001");
	
	socket.on("connect", () => {
		socket.emit("my_id", socket.id, user_id, user_name);
	});

	listenStartEvents();
	listenStopEvents();
	listenMoveEvents();
	
	resizeEverything();
	game.setState("in-menu");
}

function hideIcons() {
	keys.hide();
	consts.MARK_ICON.hide();
	consts.CROSS_ICON.hide();
	consts.CROSS_ICON2.hide();
}

function draw() {
	consts.playAppropriateMusic();
	clear(0, 0, 0, 0);
	hideIcons();
	background(0);
	if (!document.getElementById("canvas-parent")) {
		socket.emit("quit-ongoing-game");
		should_load = true;
		consts.switchMusic("none");
	}
	else if (should_load)
		inMainMenu();
	if (game.state === "waiting-player" || game.state === "waiting-readiness" || game.state === "countdown" || game.state === "relaunch-countdown" || game.state === "in-game")
		game.map.render(1);
	if (game.state === "in-menu-input" || game.state === "waiting-player" || game.state === "in-menu-create")
		image(consts.RETURN_ICON, consts.WIDTH * 0.90, consts.HEIGHT * 0.01, consts.medium_square_diameter, consts.medium_square_diameter);
	if (game.state === "in-menu-create") {
		drawMinimaps();
		outputAnnouncement("Game Creation", consts.std_font_size, consts.WIDTH / 2, consts.HEIGHT / 7, "white");
		outputAnnouncement("score limit   ", consts.medium_font_size, consts.WIDTH * 1.20 / 5, consts.HEIGHT * 0.48, "white")
	}
	if (game.state === "opponent-left-menu" && game.spectator === true)
		outputAnnouncement("A player left", consts.std_font_size, consts.WIDTH / 2, consts.HEIGHT / 2, "white");
	else if (game.state === "opponent-left-menu")
		outputAnnouncement("Your opponent left", consts.std_font_size, consts.WIDTH / 2, consts.HEIGHT / 2, "white");
	if (game.state === "in-menu")
		outputAnnouncement("CyberPong 1977", consts.std_font_size * 1.5, consts.WIDTH / 2, consts.HEIGHT / 4, "white");
	else if (game.state === "in-menu-input") {
		drawSpectate();
		outputAnnouncement("Enter Room ID", consts.std_font_size, consts.WIDTH / 2, consts.HEIGHT * 2 / 5, "white")
		if (errors.game_full)
			outputAnnouncement("This game is already full", consts.small_font_size, consts.WIDTH / 2, consts.HEIGHT / 2, "white");
		else if (errors.game_not_found)
			outputAnnouncement("This game doesn't exist", consts.small_font_size, consts.WIDTH / 2, consts.HEIGHT / 2, "white");	
	}
	else if (game.state === "waiting-player") {
		if (game.spectator)
			drawSpectate();
		buttons.return.show();
		image(consts.RETURN_ICON, consts.WIDTH * 0.90, consts.HEIGHT * 0.01, consts.medium_square_diameter, consts.medium_square_diameter);
		outputAnnouncement("WAITING FOR ANOTHER PLAYER", consts.medium_font_size, consts.WIDTH / 2, consts.HEIGHT / 2, "white");
	}
	else if (game.state === "waiting-readiness") {
		if (game.spectator)
			drawSpectate();
		drawPlayerReadiness();
		outputAnnouncement("PLEASE PRESS SPACE TO START THE GAME", consts.medium_font_size, consts.WIDTH / 2, consts.HEIGHT / 2, "white");
	}
	else if (game.state === "countdown") {
		if (game.spectator)
			drawSpectate();
		outputCountdown();
		drawBallIntent();
		if (!game.local && !game.spectator)
			drawHelp();
		if (!game.spectator)
			drawInput();
		for (let i : number = 0; i < game.players.length; i++)
			game.players[i].render();
	}
	else if (game.state === "relaunch-countdown") {
		outputCountdown();
		movePlayers();
		for (let player of game.players)
			player.render();
		game.pong.render();
		drawBallIntent();
	}
	else if (game.state === "in-game") {
		if (game.spectator)
			drawSpectate();
		movePlayers();
		if (game.state === "in-game") {
			for (let i : number = 0; i < game.players.length; i++)
				game.players[i].render();
			game.pong.render();
			if (game.map.name === "city")
				for (let bumper of bumpers)
					bumper.render();
		}
		if (game.frames_since_point > 10 && game.frames_since_point < 180 && game.map.name === "casino")
			outputAnnouncement(game.pong.value + (game.pong.value === 1 || game.pong.value === -1 ? " point" : " points"), consts.std_font_size, consts.WIDTH * 0.5, consts.HEIGHT * 0.95, game.pong.color);
	}
	else if (game.state === "game-over") {
		buttons.return.show();
		image(consts.RETURN_ICON, consts.WIDTH * 0.90, consts.HEIGHT * 0.01, consts.medium_square_diameter, consts.medium_square_diameter);
		outputAnnouncement((game.score[0] > game.score[1] ? "Player 1 " : "Player 2 ") + "won the game!", consts.std_font_size, width / 2, height / 2, "white")
	}	
}
