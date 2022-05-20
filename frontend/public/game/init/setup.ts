// ? P to quit local mode
// ? Coding consistency : snake_case for variables | camelCase for functions | PascalCase for classes
// ? Map indexes : 1 (normal map)

// TODO local mode : pause by pressing escape -> removing sound or quitting to menu
// TODO adding options and probably sounds

// TODO in menu creation, button to go to map page and choose a map

// TODO key animation not playing on safari

// TODO add switch classic/themed mode 1977 / 2077
// ? classic mode has no power-ups and is retro-themed
// ? themed mode has power ups and should be coherent within a specific theme (to be defined)
// ? CYBERPUNK themed so futuristic shit idk

// TODO different map ideas, windjammer inspired
// TODO for example, each pong ball gives a random number of points
// ? Casino
// TODO another with walls in the middle, forcing the player to play around it
// ? Arena
// TODO another where the goaling zone is reduced and changes depending on who scored last
// ? Stadium

// TODO power ups 
// ? they will spawn one at a time for 2 seconds
// ? on a random y point, and on the x point of either one of the players
// ? resize paddle depending on malus/bonus
// ? inverted input
// ? black hole teleport ball

let should_load : boolean = false;

let consts : Consts = null;
let game : Game = null;
let errors : Errors = null;
let buttons : Buttons = null;
let inputs : Inputs = null;
let keys : Keys = null;
let player_input : number[] = [];

let canvas : any = null;
let socket : any = null;

function preload() {
	consts = new Consts();
	keys = new Keys();
}

function setup() {
	
	keys.init();
	game = new Game();
	inputs = new Inputs();
	errors = new Errors();
	buttons = new Buttons();
	
	
	canvas = createCanvas(consts.WIDTH, consts.HEIGHT);
	canvas.parent(document.getElementById("canvas-parent"));
	background(0);
	textFont(consts.FONT);
	frameRate(60);
	
	// @ts-ignore:next-line
	socket = io("http://127.0.0.1:3001");
	
	socket.on("connect", () => {
		socket.emit("my_id", socket.id);
	});
	
	
	listenStartEvents();
	listenStopEvents();
	listenMoveEvents();
	
	resizeEverything();
}

function hideIcons() {
	keys.hide();
	consts.RETURN_ICON.hide();
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
		game.map.render();
	if (game.state === "in-menu-input" || game.state === "waiting-player" || game.state === "in-menu-create")
		consts.RETURN_ICON.show();
	if (game.state === "in-menu-create") {
		outputAnnouncement("Game Creation", consts.std_font_size, consts.WIDTH / 2, consts.HEIGHT / 5);
		outputAnnouncement("score limit   ", consts.medium_font_size, consts.WIDTH * 1.20 / 5, consts.HEIGHT * 2.9 / 5)
	}
	if (game.state === "opponent-left-menu")
		outputAnnouncement("Your opponent left", consts.std_font_size, consts.WIDTH / 2, consts.HEIGHT / 2);
	if (game.state === "in-menu")
		outputAnnouncement("CyberPong 1977", consts.std_font_size * 1.5, consts.WIDTH / 2, consts.HEIGHT / 4);
	else if (game.state === "in-menu-input") {
		outputAnnouncement("Enter Room ID", consts.std_font_size, consts.WIDTH / 2, consts.HEIGHT * 2 / 5)
		if (errors.game_full)
			outputAnnouncement("This game is already full", consts.small_font_size, consts.WIDTH / 2, consts.HEIGHT / 2);
		else if (errors.game_not_found)
			outputAnnouncement("This game doesn't exist", consts.small_font_size, consts.WIDTH / 2, consts.HEIGHT / 2);
	}
	else if (game.state === "waiting-player") {
		buttons.return.show();
		consts.RETURN_ICON.show();
		outputAnnouncement("WAITING FOR ANOTHER PLAYER", consts.medium_font_size, consts.WIDTH / 2, consts.HEIGHT / 2);
	}
	else if (game.state === "waiting-readiness") {
		drawPlayerReadiness();
		outputAnnouncement("PLEASE PRESS SPACE TO START THE GAME", consts.medium_font_size, consts.WIDTH / 2, consts.HEIGHT / 2);
	}
	else if (game.state === "countdown") {
		outputCountdown();
		if (!game.local)
			drawHelp();
		drawInput();
		for (let i : number = 0; i < game.players.length; i++)
			game.players[i].render();
	}
	else if (game.state === "in-game") {
		movePlayers();
		if (game.state === "in-game") {
			for (let i : number = 0; i < game.players.length; i++)
				game.players[i].render();
			game.pong.render();
		}
	}
	else if (game.state === "game-over") {
		buttons.return.show();
		consts.RETURN_ICON.show();
		outputAnnouncement((game.score[0] > game.score[1] ? "Player 1 " : "Player 2 ") + "won the game!", consts.std_font_size, width / 2, height / 2)
	}
}
