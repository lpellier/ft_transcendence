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

function create_button(title : string, mPressed : any, mOver : any = highlightButton, mOut : any = resetButton, size_x : number = 280, size_y : number = 175) {
	let button = createButton(title);
	button.style("color", "white");
	button.style("font-size", "40px");
	button.style("font-family", "PressStart2P-Regular");
	button.style("background-color", "black");
	button.style("border-radius", "1em");
	button.size(size_x, size_y); // 280, 175 default

	button.mousePressed(mPressed);
	button.mouseOver(mOver);
	button.mouseOut(mOut);

	return button;
}

function create_input(title : string) {
	let input = createInput(title);
	// input.position(MAP_WIDTH / 2 - 200, MAP_HEIGHT * 2 / 3 - 37.5);
	input.style("width", "600px");
	input.style("height", "75px");
	input.style("font-size", "45px");
	input.style("font-family", "PressStart2P-Regular");
	input.style("background-color", "black");
	input.style("color", "white");
	input.style("border", "none");
	input.style("outline", "3px solid white");

	return input;
}

function init_g_vars() {
	game = new Game();
	inputs = new Inputs();
	errors = new Errors();
	buttons = new Buttons();

	// socket = io();
}
