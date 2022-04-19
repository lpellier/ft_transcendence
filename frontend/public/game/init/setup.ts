// TODO for red cross, green mark
	// should find pixelated versions to be consistent with the rest

// TODO gifs for keys : https://ezgif.com/sprite-cutter - Gerald's keys

// TODO for local button
	// first a help page to describe inputs needed -> 
	// wasd (zqsd) icons upper left / up.left.down.right icons down right with input needed highlighted
	// something to be able to go back to menu

// TODO only left click should work for clicking buttons // ? need to test

// ?TODO set url to room id

// TODO different map ideas, windjammer inspired
// TODO for example, each pong ball gives a random number of points
// TODO another with walls in the middle, forcing the player to play around it

// TODO consistency in variable/function naming

// TODO should have nothing but createImg, that kind of thing in preload

// TODO only keys that are used should be moving as gifs

let shouldLoad : boolean = false;

let consts : Consts = null;
let game : Game = null;
let errors : Errors = null;
let buttons : Buttons = null;
let inputs : Inputs = null;
let keys : Keys = null;

let canvas : any = null;
let socket : any = null;


function preload() {
	consts = new Consts();
	keys = new Keys();
}

function keyPressed() {
	if (game == null)
		return;
	// if (game.state == "waiting-readiness" && key == ' ') 
	// 	socket.emit("switch_readiness", game.players[0].id);
	// if (game.state == "in-game" && key == 'R')
	// 	socket.emit("restart_game", game.room_id);
	// if (game.state == "in-menu-input" && keyCode == ENTER) {
	// 	if (inputs.join.value()[0] == '#')
	// 		inputs.join.value(inputs.join.value().slice(1));
	// 	socket.emit("find_game", inputs.join.value());
	// }
	// if (game.state == "in-menu-create" && keyCode == ENTER) {
	// 	if (inputs.join.value()[0] == '#')
	// 		inputs.join.value(inputs.join.value().slice(1));
	// 	socket.emit("find_game", inputs.join.value());
	// }
}

function in_main_menu() {
	shouldLoad = false;
	game.reset();
	errors.set_false();
	buttons.reset();
	buttons.create_buttons();
	inputs.reset();
	inputs.create_inputs();
	// if (game.state == "waiting-player")
	// 	socket.emit("quit")
	
}

function setup() {
	canvas = createCanvas(consts.MAP_WIDTH, consts.MAP_HEIGHT);
	canvas.parent(document.getElementById("canvas-parent"));
	background(0);

	frameRate(60);
	game = new Game();
	inputs = new Inputs();
	errors = new Errors();
	buttons = new Buttons();

	// socket = io();

	// listen_start_events();
	// listen_stop_events();
	// listen_move_events();
}

function move_players() {
	if (!game.local) {
		// if (keyIsDown(UP_ARROW) && keyIsDown(32))
		// 	socket.emit("dash", game.players[0].id, 1);
		// else if (keyIsDown(DOWN_ARROW) && keyIsDown(32))
		// 	socket.emit("dash", game.players[0].id, -1);
		// if (keyIsDown(UP_ARROW))
		// 	socket.emit("move_up", game.players[0].id);
		// else if (keyIsDown(DOWN_ARROW))
		// 	socket.emit("move_down", game.players[0].id);
		// else
		// 	socket.emit("do_nothing", game.players[0].id);
	}
	else {
		if (keyIsDown(UP_ARROW))
			game.players[1].move_up();
		else if (keyIsDown(DOWN_ARROW))
			game.players[1].move_down();
		if (keyIsDown(87))
			game.players[0].move_up();
		else if (keyIsDown(83))
			game.players[0].move_down();
		else if (keyIsDown(27)) {
			in_main_menu();
			return ;
		}
		game.pong.calculateNewPos();
		checkCollisions();
	}
}

function draw() {
	if (!document.getElementById("canvas-parent")) {
		shouldLoad = true;
		return ;
	}
	else if (shouldLoad)
		in_main_menu();
	clear(0, 0, 0, 0);
	draw_background();
	if (game.state == "waiting-player" || game.state == "waiting-readiness" || game.state == "countdown" || game.state == "in-game")
		draw_map();
	if (game.state == "in-menu-input" || game.state == "waiting-player" || game.state == "in-menu-create")
		image(consts.RETURN_ICON, 1050, 50, 100, 100);
	if (game.state == "in-menu-create")
		output_announcement("Game Creation", 55, consts.MAP_WIDTH / 2, consts.MAP_HEIGHT / 5);
	if (game.state == "in-menu")
		output_announcement("CyberPong 2077", 70, consts.MAP_WIDTH / 2, consts.MAP_HEIGHT / 4);
	else if (game.state == "in-menu-input") {
		output_announcement("Enter Room ID", 55, consts.MAP_WIDTH / 2, consts.MAP_HEIGHT * 2 / 5)
		if (errors.game_full)
			output_announcement("This game is already full", 20, consts.MAP_WIDTH / 2, consts.MAP_HEIGHT / 2);
		else if (errors.game_not_found)
			output_announcement("This game doesn't exist", 20, consts.MAP_WIDTH / 2, consts.MAP_HEIGHT / 2);
	}
	else if (game.state == "waiting-player")
		output_announcement("WAITING FOR ANOTHER PLAYER", 25, consts.MAP_WIDTH / 2, consts.MAP_HEIGHT / 2);
	else if (game.state == "waiting-readiness") {
		draw_player_readiness();
		output_announcement("PLEASE PRESS SPACE TO START THE GAME", 18, consts.MAP_WIDTH / 2, consts.MAP_HEIGHT / 2);
	}
	else if (game.state == "countdown") {
		output_countdown();
		if (!game.local)
			draw_help();
		draw_input();
		draw_players();
	}
	else if (game.state == "in-game") {
		move_players();
		if (game.state == "in-game") {
			draw_players();
			draw_pong();
		}
	}
	// keys.w.position(50, 50);
	// keys.s.position(50, 100);
}
