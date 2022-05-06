
// ? Coding consistency : snake_case for variables | camelCase for functions

// TODO Finish or remove dash ability
// TODO for local button
	// create game menu but locally
	// pause by pressing escape -> removing sound or quitting to menu

// TODO add AI

// TODO different map ideas, windjammer inspired
// TODO for example, each pong ball gives a random number of points
// TODO another with walls in the middle, forcing the player to play around it
// TODO another where the goaling zone is reduced and changes depending on who scored last
// TODO power ups : resize paddle depending on malus/bonus
// TODO adding options and probably sounds

// TODO server should send constants like map width and height itself in case of changing things
// TODO Games should have map heights and width constants in their class, because it might be different for other people

// TODO When done with collisions, should copy the code back for local

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

function keyPressed() {
	if (game === null)
		return;
	if (game.state === "waiting-readiness" && key === ' ') 
		socket.emit("switch_readiness", game.players[0].id);
	// if (game.state === "in-game" && key === 'R')
	// 	socket.emit("restart_game", game.room_id);
	if (game.state === "in-menu-input" && keyCode === ENTER) {
		if (inputs.join.value()[0] === '#')
			inputs.join.value(inputs.join.value().slice(1));
		socket.emit("find_game", inputs.join.value());
	}
	if (game.state === "in-menu-create" && keyCode === ENTER) {
		if (inputs.join.value()[0] === '#')
			inputs.join.value(inputs.join.value().slice(1));
		socket.emit("find_game", inputs.join.value());
	}
}

function inMainMenu() {
	if (game.state === "waiting-player")
		socket.emit("quit-own-game");
	should_load = false;
	game.reset();
	errors.set_false();
	buttons.reset();
	buttons.createButtons();
	inputs.reset();
	inputs.create_inputs();
}

function goToMainMenu() {
	if (mouseButton === LEFT)
		inMainMenu();
}

function opponentLeftMenu() {
	game.state = "opponent-left-menu";
	buttons.hide();
	buttons.opponent_left_ok.parent().style["z-index"] = 2; // deal with buttons overlapping
	buttons.opponent_left_ok.show();
}

function setup() {
	canvas = createCanvas(consts.MAP_WIDTH, consts.MAP_HEIGHT);
	canvas.parent(document.getElementById("canvas-parent"));
	background(0);

	frameRate(60);
	keys.init();
	game = new Game();
	inputs = new Inputs();
	errors = new Errors();
	buttons = new Buttons();

	// @ts-ignore:next-line
	socket = io("http://127.0.0.1:3001");

	socket.on("connect", () => {
		socket.emit("my_id", socket.id);
	});

	listenStartEvents();
	listenStopEvents();
	listenMoveEvents();
}

function movePlayers() {
	if (!game.local) {
		// if (keyIsDown(UP_ARROW) && keyIsDown(32))
		// 	socket.emit("dash", game.players[0].id, 1);
		// else if (keyIsDown(DOWN_ARROW) && keyIsDown(32))
		// 	socket.emit("dash", game.players[0].id, -1);
		if (keyIsDown(UP_ARROW)) {
			player_input.push(1);
			socket.emit("move_up", game.players[0].id);
		}
		else if (keyIsDown(DOWN_ARROW)) {
			player_input.push(-1);
			socket.emit("move_down", game.players[0].id);
		}
		else
			socket.emit("move_null", game.players[0].id);
	}
	else {
		if (keyIsDown(UP_ARROW))
			game.players[1].moveUp();
		else if (keyIsDown(DOWN_ARROW))
			game.players[1].moveDown();
		if (keyIsDown(87))
			game.players[0].moveUp();
		else if (keyIsDown(83))
			game.players[0].moveDown();
		else if (keyIsDown(27)) {
			inMainMenu();
			return ;
		}
		game.pong.calculateNewPos();
	}
}

function draw() {
	clear(0, 0, 0, 0);
	if (!document.getElementById("canvas-parent")) {
		socket.emit("quit-ongoing-game");
		should_load = true;
		return ;
	}
	else if (should_load)
		inMainMenu();
	keys.hide();
	consts.RETURN_ICON.hide();
	consts.MARK_ICON.hide();
	consts.CROSS_ICON.hide();
	consts.CROSS_ICON2.hide();
	drawBackground();
	if (game.state === "waiting-player" || game.state === "waiting-readiness" || game.state === "countdown" || game.state === "in-game")
		drawMap();
	if (game.state === "in-menu-input" || game.state === "waiting-player" || game.state === "in-menu-create")
		consts.RETURN_ICON.show();
	if (game.state === "in-menu-create") {
		outputAnnouncement("Game Creation", 55, consts.MAP_WIDTH / 2, consts.MAP_HEIGHT / 5);
		outputAnnouncement("score limit : ", 30, consts.MAP_WIDTH / 5, consts.MAP_HEIGHT * 3 / 5)
	}
	if (game.state === "opponent-left-menu")
		outputAnnouncement("Your opponent left", 55, consts.MAP_WIDTH / 2, consts.MAP_HEIGHT / 2);
	if (game.state === "in-menu")
		outputAnnouncement("CyberPong 2077", 70, consts.MAP_WIDTH / 2, consts.MAP_HEIGHT / 4);
	else if (game.state === "in-menu-input") {
		outputAnnouncement("Enter Room ID", 55, consts.MAP_WIDTH / 2, consts.MAP_HEIGHT * 2 / 5)
		if (errors.game_full)
			outputAnnouncement("This game is already full", 20, consts.MAP_WIDTH / 2, consts.MAP_HEIGHT / 2);
		else if (errors.game_not_found)
			outputAnnouncement("This game doesn't exist", 20, consts.MAP_WIDTH / 2, consts.MAP_HEIGHT / 2);
	}
	else if (game.state === "waiting-player") {
		buttons.return.show();
		consts.RETURN_ICON.show();
		outputAnnouncement("WAITING FOR ANOTHER PLAYER", 25, consts.MAP_WIDTH / 2, consts.MAP_HEIGHT / 2);
	}
	else if (game.state === "waiting-readiness") {
		drawPlayerReadiness();
		outputAnnouncement("PLEASE PRESS SPACE TO START THE GAME", 25, consts.MAP_WIDTH / 2, consts.MAP_HEIGHT / 2);
	}
	else if (game.state === "countdown") {
		outputCountdown();
		if (!game.local)
			drawHelp();
		else
			drawInput(); // TODO draw input for multiplayer but only on one side
		drawPlayers();
	}
	else if (game.state === "in-game") {
		movePlayers();
		if (game.state === "in-game") {
			drawPlayers();
			drawPong();
		}
	}
	else if (game.state === "game-over") {
		buttons.return.show();
		consts.RETURN_ICON.show();
		outputAnnouncement((game.score[0] > game.score[1] ? "Player 1 " : "Player 2 ") + "won the game!", 45, width / 2, height / 2)
	}
}
