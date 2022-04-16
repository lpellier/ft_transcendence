function createGameMenu() {
	buttons.hide();
	inputs.hide();

	buttons.return.show();
	buttons.anyone_can_join.show();
	buttons.friends_can_join.show();
	buttons.invitation_only.show();
	buttons.validate.show();

	game.state = "in-menu-create";
}

function createGame() {
	socket.emit("matchmaking", game.publicity, false);
}
function matchmaking() {
	socket.emit("matchmaking", "public", true);
}

function highlightButton() {
	this.style("color", "#d4d4d4");
}
function resetButton() {
	this.style("color", "white");
}

function click_anyone() {
	game.publicity = buttons.click_anyone();
}
function click_friends() {
	game.publicity = buttons.click_friends();
}
function click_invitation() {
	game.publicity = buttons.click_invitation();
}

function create_button(title : string) {
	let button = createButton(title);
	button.style("color", "white");
	button.style("font-size", "40px");
	button.style("font-family", "PressStart2P-Regular");
	button.style("background-color", "black");
	button.style("border-radius", "1em");
	button.size(280, 175);
	return button;
}

function create_buttons() {
	buttons.create_game = create_button("Create a game");
	buttons.create_game.mousePressed(createGameMenu);
	buttons.create_game.mouseOver(highlightButton);
	buttons.create_game.mouseOut(resetButton);
	
	buttons.join = create_button("Join game");
	buttons.join.mousePressed(readRoomID);
	buttons.join.mouseOver(highlightButton);
	buttons.join.mouseOut(resetButton);
	
	buttons.matchmaking = create_button("Match making");
	buttons.matchmaking.mousePressed(matchmaking);
	buttons.matchmaking.mouseOver(highlightButton);
	buttons.matchmaking.mouseOut(resetButton);
	
	buttons.local = create_button("Play local");
	buttons.local.mousePressed(startLocal);
	buttons.local.mouseOver(highlightButton);
	buttons.local.mouseOut(resetButton);
	
	buttons.return = create_button("");
	buttons.return.style("border", "none");
	buttons.return.size(75, 75);
	buttons.return.mousePressed(in_main_menu);
	buttons.return.mouseOver(highlightButton);
	buttons.return.mouseOut(resetButton);
	
	
	buttons.anyone_can_join = create_button("Anyone can join");
	buttons.anyone_can_join.style("outline", "5px solid"); // !
	buttons.anyone_can_join.size(200, 75);
	buttons.anyone_can_join.mousePressed(click_anyone);
	buttons.anyone_can_join.mouseOver(highlightButton);
	buttons.anyone_can_join.mouseOut(resetButton);
	
	buttons.friends_can_join = create_button("Friends can join");
	buttons.friends_can_join.style("outline", "5px solid"); // !
	buttons.friends_can_join.size(200, 75);
	buttons.friends_can_join.mousePressed(click_friends);
	buttons.friends_can_join.mouseOver(highlightButton);
	buttons.friends_can_join.mouseOut(resetButton);
	
	buttons.invitation_only = create_button("Invitation only");
	buttons.invitation_only.style("outline", "5px solid"); // !
	buttons.invitation_only.size(200, 75);
	buttons.invitation_only.mousePressed(click_invitation);
	buttons.invitation_only.mouseOver(highlightButton);
	buttons.invitation_only.mouseOut(resetButton);
	
	buttons.validate = create_button('Create');
	buttons.validate.size(150, 50);
	buttons.validate.mouseOver(highlightButton);
	buttons.validate.mouseOut(resetButton);
	buttons.validate.mousePressed(createGame);
	
	buttons.hide();
	buttons.addParent();
}

function create_input() {
	
	inputs.join = createInput('');
	inputs.join.position(MAP_WIDTH / 2 - 200, MAP_HEIGHT * 2 / 3 - 37.5);
	inputs.join.style("width", "400px");
	inputs.join.style("height", "50px");
	inputs.join.style("font-size", "35px");
	inputs.join.style("font-family", "PressStart2P-Regular");
	inputs.join.style("background-color", "black");
	inputs.join.style("color", "white");
	inputs.join.style("outline", "none");

	inputs.hide();
	inputs.addClass();
}

function init_g_vars() {
	game = new Game;
	inputs = new Inputs;
	errors = new Errors;
	buttons = new Buttons;

	game.players = [];
	game.room_id = "";
	game.timer = 3;
	game.score = [0, 0];
	game.state = "in-menu";
	game.publicity = "public";
	game.local = false;
	game.framesSincePoint = 0;

	errors.set_false();

	create_buttons();
	create_input();

	// socket = io();
}
