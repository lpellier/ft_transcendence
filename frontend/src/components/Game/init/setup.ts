// ? P to quit local mode
// ? Coding consistency : snake_case for variables | camelCase for functions | PascalCase for classes
// ? Map indexes : 1 (normal map), 2 (city map), 3 (casino map)

// ? casino enhancement : more chances to get lower valued pongs
// ? add a -1 pong to remove a point from opponent

// ? add a break

// ? reupdate pos bumperswhen window resiwed

// TODO find a way to send data to database and fill every appropriate field when situation calls for it

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

	bumpers.push(new Bumper(animation, consts.WIDTH / 2 - diameter / 2, consts.HEIGHT * 1 / 4 - diameter / 2, diameter));
	bumpers.push(new Bumper(animation, consts.WIDTH / 2 - diameter / 2, consts.HEIGHT * 3 / 4 - diameter / 2, diameter));

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
}

function hideIcons() {
	keys.hide();
	consts.MARK_ICON.hide();
	consts.CROSS_ICON.hide();
	consts.CROSS_ICON2.hide();
}

function draw() {
	clear(0, 0, 0, 0);
	hideIcons();
	background(0);
	if (!document.getElementById("canvas-parent")) {
		socket.emit("quit-ongoing-game");
		should_load = true;
		return ;
	}
	else if (should_load)
		inMainMenu();
	if (game.state === "waiting-player" || game.state === "waiting-readiness" || game.state === "countdown" || game.state === "in-game")
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
		if (!game.local && !game.spectator)
			drawHelp();
		if (!game.spectator)
			drawInput();
		for (let i : number = 0; i < game.players.length; i++)
			game.players[i].render();
	}
	else if (game.state === "in-game") {
		if (game.spectator)
			drawSpectate();
		movePlayers();
		if (game.state === "in-game") {
			for (let i : number = 0; i < game.players.length; i++)
				game.players[i].render();
			game.pong.render();
			if (game.map.name === "city") {
				for (let bumper of bumpers) {
					bumper.render();
					bumper.checkCollision(game.pong);
				}
			}
		}
		if (game.frames_since_point < 180 && game.map.name === "casino")
			outputAnnouncement(game.pong.value + (game.pong.value === 1 || game.pong.value === -1 ? " point" : " points"), consts.std_font_size, consts.WIDTH * 0.5, consts.HEIGHT * 0.95, game.pong.color);
	}
	else if (game.state === "game-over") {
		buttons.return.show();
		image(consts.RETURN_ICON, consts.WIDTH * 0.90, consts.HEIGHT * 0.01, consts.medium_square_diameter, consts.medium_square_diameter);
		outputAnnouncement((game.score[0] > game.score[1] ? "Player 1 " : "Player 2 ") + "won the game!", consts.std_font_size, width / 2, height / 2, "white")
	}	
}
