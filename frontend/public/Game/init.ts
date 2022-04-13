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

function create_buttons() {
	buttons.create_game = createButton("Create a game");
	buttons.create_game.style("color", "white");
	buttons.create_game.style("font-size", "25px");
	buttons.create_game.style("font-family", "PressStart2P-Regular");
	buttons.create_game.style("background-color", "black");
	buttons.create_game.style("border-radius", "1em");
	buttons.create_game.size(175, 100);
	buttons.create_game.mousePressed(createGameMenu);
	buttons.create_game.mouseOver(highlightButton);
	buttons.create_game.mouseOut(resetButton);
	
	buttons.join = createButton("Join game");
	buttons.join.style("color", "white");
	buttons.join.style("font-size", "25px");
	buttons.join.style("font-family", "PressStart2P-Regular");
	buttons.join.style("background-color", "black");
	buttons.join.style("border-radius", "1em");
	buttons.join.size(175, 100);
	buttons.join.mousePressed(readRoomID);
	buttons.join.mouseOver(highlightButton);
	buttons.join.mouseOut(resetButton);
	
	buttons.matchmaking = createButton("Match making");
	buttons.matchmaking.style("color", "white");
	buttons.matchmaking.style("font-size", "25px");
	buttons.matchmaking.style("font-family", "PressStart2P-Regular");
	buttons.matchmaking.style("background-color", "black");
	buttons.matchmaking.style("border-radius", "1em");
	buttons.matchmaking.size(175, 100);
	buttons.matchmaking.mousePressed(matchmaking);
	buttons.matchmaking.mouseOver(highlightButton);
	buttons.matchmaking.mouseOut(resetButton);
	
	buttons.local = createButton("Play local");
	buttons.local.style("color", "white");
	buttons.local.style("font-size", "25px");
	buttons.local.style("font-family", "PressStart2P-Regular");
	buttons.local.style("background-color", "black");
	buttons.local.style("border-radius", "1em");
	buttons.local.size(175, 100);
	buttons.local.mousePressed(startLocal);
	buttons.local.mouseOver(highlightButton);
	buttons.local.mouseOut(resetButton);
	
	buttons.return = createButton("");
	buttons.return.style("color", "rgba(0, 0, 0, 0)");
	buttons.return.style("background-color", "rgba(0, 0, 0, 0)");
	buttons.return.style("border", "none");
	buttons.return.style("border-radius", "1em");
	buttons.return.size(75, 75);
	buttons.return.mousePressed(in_main_menu);
	buttons.return.mouseOver(highlightButton);
	buttons.return.mouseOut(resetButton);
	
	buttons.anyone_can_join = createButton("Anyone can join");
	buttons.friends_can_join = createButton("Friends can join");
	buttons.invitation_only = createButton("Invitation only");
	
	buttons.anyone_can_join.style("background-color", "rgba(0, 0, 0, 0)");
	buttons.anyone_can_join.style("border", "none");
	buttons.anyone_can_join.style("font-size", "20px");
	buttons.anyone_can_join.style("font-family", "PressStart2P-Regular");
	buttons.anyone_can_join.style("color", "white");
	buttons.anyone_can_join.style("border-radius", "1em");
	buttons.anyone_can_join.style("outline", "5px solid"); // !
	buttons.anyone_can_join.size(200, 75);
	buttons.anyone_can_join.mousePressed(click_anyone);
	buttons.anyone_can_join.mouseOver(highlightButton);
	buttons.anyone_can_join.mouseOut(resetButton);
	
	buttons.friends_can_join.style("background-color", "rgba(0, 0, 0, 0)");
	buttons.friends_can_join.style("border", "none");
	buttons.friends_can_join.style("font-size", "20px");
	buttons.friends_can_join.style("font-family", "PressStart2P-Regular");
	buttons.friends_can_join.style("color", "white");
	buttons.friends_can_join.style("border-radius", "1em");
	buttons.friends_can_join.size(200, 75);
	buttons.friends_can_join.mousePressed(click_friends);
	buttons.friends_can_join.mouseOver(highlightButton);
	buttons.friends_can_join.mouseOut(resetButton);
	
	buttons.invitation_only.style("background-color", "rgba(0, 0, 0, 0)");
	buttons.invitation_only.style("border", "none");
	buttons.invitation_only.style("font-size", "20px");
	buttons.invitation_only.style("font-family", "PressStart2P-Regular");
	buttons.invitation_only.style("color", "white");
	buttons.invitation_only.style("border-radius", "1em");
	buttons.invitation_only.size(210, 75);
	buttons.invitation_only.mousePressed(click_invitation);
	buttons.invitation_only.mouseOver(highlightButton);
	buttons.invitation_only.mouseOut(resetButton);
	
	buttons.validate = createButton('Create');
	buttons.validate.style("background-color", "black");
	buttons.validate.style("color", "white");
	buttons.validate.style("font-size", "20px");
	buttons.validate.style("font-family", "PressStart2P-Regular");
	buttons.validate.style("border-radius", "1em");
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
