// TODO for red cross, green mark
	// should find pixelated versions to be coherent with the rest

// TODO for local button
	// first a help page to describe inputs needed
	// need to code the game and calculations client-side (preferably, in a separate file)
	// something to be able to go back to menu
	
// TODO the better score is highlighted 

// TODO only left click should work for clicking buttons

// ?TODO set url to room id

const PLAYER_WIDTH : number = 15;
const PLAYER_HEIGHT : number = 80;

const PONG_DIAMETER : number = 12;
const PONG_BASE_SPEED : number = 6;
const PONG_MAX_SPEED : number = 12;
const PONG_COLOR : string = "white";

const MAP_WIDTH : number = 1200;
const MAP_HEIGHT : number = 750;
const PLAYER_SPEED : number = 7;

const top_bound : number = 10;
const bot_bound : number = MAP_HEIGHT - 10;
const left_bound : number = 0;
const right_bound : number = MAP_WIDTH;

let shouldLoad = false;

let canvas : any;

let game : Game = null;
let errors : Errors;
let buttons : Buttons;
let inputs : Inputs;

let socket : any = null;

let g_font : any;
let return_icon : any;

function readRoomID() {
	game.state = "in-menu-input";
	buttons.hide();
	inputs.join.show();
	buttons.return.show();
}

function preload() {
	g_font = loadFont("./../assets/PressStart2P-Regular.ttf");
	return_icon = loadImage("./../assets/return-button2.png");
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

function startLocal() {
	buttons.hide();
	inputs.hide();
	game.timer = 4;
	for (let i = 0; i < 5; i++) {
		setTimeout(() => {
			game.timer--;
			if (game.timer == -1 && game.state == "countdown") {
				game.state = "in-game";
			}
		}, i * 1000);
	}
	game.state = "countdown";
	game.players.push(new Player(MAP_WIDTH / 12, MAP_HEIGHT / 2 - PLAYER_HEIGHT / 2, PLAYER_WIDTH, PLAYER_HEIGHT, "white", 1, "first"));
	game.players.push(new Player(MAP_WIDTH * 11 / 12, MAP_HEIGHT / 2 - PLAYER_HEIGHT / 2, PLAYER_WIDTH, PLAYER_HEIGHT, "white", 2, "second"));		
	game.pong = new Pong;
	game.local = true;
	game.room_id = " Local";
}

function setup() {
	canvas = createCanvas(MAP_WIDTH, MAP_HEIGHT);
	canvas.parent(document.getElementById("canvas-parent"));
	background(0);

	frameRate(60);
	init_g_vars();

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
	if (!document.getElementById("canvas-parent"))
		shouldLoad = true;
	else if (shouldLoad)
		in_main_menu();
	clear(0, 0, 0, 0);
	draw_background();
	if (game.state == "waiting-player" || game.state == "waiting-readiness" || game.state == "countdown" || game.state == "in-game")
		draw_map();
	if (game.state == "in-menu-input" || game.state == "waiting-player" || game.state == "in-menu-create")
		image(return_icon, 1050, 50, 100, 100);
	if (game.state == "in-menu-create")
		output_announcement("Game Creation", 55, MAP_WIDTH / 2, MAP_HEIGHT / 5);
	if (game.state == "in-menu")
		output_announcement("Pongscendance", 70, MAP_WIDTH / 2, MAP_HEIGHT / 4);
	else if (game.state == "in-menu-input") {
		output_announcement("Enter Room ID", 55, MAP_WIDTH / 2, MAP_HEIGHT * 2 / 5)
		if (errors.game_full)
			output_announcement("This game is already full", 20, MAP_WIDTH / 2, MAP_HEIGHT / 2);
		else if (errors.game_not_found)
			output_announcement("This game doesn't exist", 20, MAP_WIDTH / 2, MAP_HEIGHT / 2);
	}
	else if (game.state == "waiting-player")
		output_announcement("WAITING FOR ANOTHER PLAYER", 25, MAP_WIDTH / 2, MAP_HEIGHT / 2);
	else if (game.state == "waiting-readiness") {
		draw_player_readiness();
		output_announcement("PLEASE PRESS SPACE TO START THE GAME", 18, MAP_WIDTH / 2, MAP_HEIGHT / 2);
	}
	else if (game.state == "countdown") {
		output_countdown();
		if (!game.local)
			draw_help();
		draw_players();
	}
	else if (game.state == "in-game") {
		move_players();
		if (game.state == "in-game") {
			draw_players();
			draw_pong();
		}
	}
}
