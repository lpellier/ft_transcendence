class Buttons {
	create_game : any;
	join : any;
	return : any;
	matchmaking : any;

	anyone_can_join : any;
	invitation_only : any;
	local : any;
	ai : any;
	validate : any;

	plus : any;
	minus : any;

	opponent_left_ok : any;

	map_original : any;
	map_city : any;
	map_casino : any;

	spectate : any;

	sound : any;

	constructor() {
		this.reset();
	}
	
	createButtons() {
		this.create_game = createCustomButton("Create game", createGameMenu, highlightButton, resetButton, consts.std_width, consts.std_height);
		this.create_game.style("border", (consts.DIAGONAL / 250).toString() + "px solid white");
		
		this.join = createCustomButton("Join game", readRoomID, highlightButton, resetButton, consts.std_width, consts.std_height);
		this.join.style("border", (consts.DIAGONAL / 250).toString() + "px solid white");

		this.matchmaking = createCustomButton("Match making", matchmaking, highlightButton, resetButton, consts.std_width, consts.std_height);
		this.matchmaking.style("border", (consts.DIAGONAL / 250).toString() + "px solid white");

		this.return = createCustomButton("", goToMainMenu, highlightButton, resetButton, consts.medium_square_diameter, consts.medium_square_diameter);
		this.return.style("border", "none");
		this.return.style("background-color", "rgba(0, 0, 0, 0)");
		this.return.position(consts.WIDTH * 0.90, consts.HEIGHT * 0.01);
		
		this.sound = createCustomButton("", clickSound, highlightButton, resetButton, consts.medium_square_diameter, consts.medium_square_diameter);
		this.sound.style("border", "none");
		this.sound.style("background-color", "rgba(0, 0, 0, 0)");
		this.sound.size(consts.small_square_diameter * 1.65, consts.small_square_diameter * 1.65);
		this.sound.position(consts.WIDTH * 0.80, consts.HEIGHT * 0.02);

		this.anyone_can_join = createCustomButton("Anyone can join", clickAnyone, highlightButton, resetButton, consts.medium_width, consts.medium_height);
		this.anyone_can_join.style("background-color", "rgba(0, 0, 0, 0)");
		this.anyone_can_join.style("font-size", consts.medium_font_size.toString() + "px");
		this.anyone_can_join.style("border", (consts.DIAGONAL / 250).toString() + "px solid white");
		this.anyone_can_join.style("outline", "none");
		this.invitation_only = createCustomButton("Invitation only", clickInvitation, highlightButton, resetButton, consts.medium_width, consts.medium_height);
		this.invitation_only.style("background-color", "rgba(0, 0, 0, 0)");
		this.invitation_only.style("border", "none");
		this.invitation_only.style("font-size", consts.medium_font_size.toString() + "px");
		this.local = createCustomButton("Play local", clickLocal, highlightButton, resetButton, consts.medium_width, consts.medium_height);
		this.local.style("background-color", "rgba(0, 0, 0, 0)");
		this.local.style("font-size", consts.medium_font_size.toString() + "px");
		this.local.style("border", "none");
		this.ai = createCustomButton("vs AI", clickAi, highlightButton, resetButton, consts.medium_width, consts.medium_height);
		this.ai.style("background-color", "rgba(0, 0, 0, 0)");
		this.ai.style("font-size", consts.medium_font_size.toString() + "px");
		this.ai.style("border", "none");
		this.validate = createCustomButton('Create', createGame, highlightButton, resetButton, consts.medium_width, consts.medium_height);
		this.validate.style("background-color", "rgba(0, 0, 0, 0)");
		this.validate.style("font-size", consts.medium_font_size.toString() + "px");
		
		this.plus = createCustomButton("+", plusScoreLimit, highlightButton, resetButton, consts.small_square_diameter, consts.small_square_diameter);
		this.plus.style("border", "none");
		this.plus.style("font-size", consts.small_font_size.toString() + "px");
		this.minus = createCustomButton("-", minusScoreLimit, highlightButton, resetButton, consts.small_square_diameter, consts.small_square_diameter);
		this.minus.style("border", "none");
		this.minus.style("font-size", consts.small_font_size.toString() + "px");
		
		this.opponent_left_ok = createCustomButton("OK", goToMainMenu, highlightButton, resetButton, consts.std_width, consts.std_height);
		this.opponent_left_ok.style("border", "none");

		this.map_original = createCustomButton("Original", clickMapOriginal, highlightButton, resetButton, consts.WIDTH * 0.2 + consts.WIDTH / 48, consts.HEIGHT * 0.2 + consts.WIDTH / 48);
		this.map_original.style("background", "none");
		this.map_original.style("outline", "none");
		this.map_original.style("border", (consts.DIAGONAL / 250).toString() + "px solid white");
		
		this.map_city = createCustomButton("City", clickMapCity, highlightButton, resetButton, consts.WIDTH * 0.2 + consts.WIDTH / 48, consts.HEIGHT * 0.2 + consts.WIDTH / 48);
		this.map_city.style("background", "none");
		this.map_city.style("border", "none");
		this.map_city.style("outline", "none");
		this.map_casino = createCustomButton("Casino", clickMapCasino, highlightButton, resetButton, consts.WIDTH * 0.2 + consts.WIDTH / 48, consts.HEIGHT * 0.2 + consts.WIDTH / 48);
		this.map_casino.style("background", "none");
		this.map_casino.style("border", "none");
		this.map_casino.style("outline", "none");

		this.map_original.style("font-size", consts.medium_font_size.toString() + "px");
		this.map_city.style("font-size", consts.medium_font_size.toString() + "px");
		this.map_casino.style("font-size", consts.medium_font_size.toString() + "px");


		this.map_original.position(consts.WIDTH * 0.0855, consts.HEIGHT * 0.56);
		this.map_city.position(consts.WIDTH * 0.3855, consts.HEIGHT * 0.56);
		this.map_casino.position(consts.WIDTH * 0.6855, consts.HEIGHT * 0.56);

		this.spectate = createCustomButton("", clickSpectate, highlightSpectateButton, resetSpectateButton, consts.WIDTH * 0.1, consts.HEIGHT * 0.1);
		this.spectate.style("background-color", "rgba(0, 0, 0, 0)");
		this.spectate.style("border", (consts.DIAGONAL / 250).toString() + "px solid white");

		this.hide();
		this.addParent();
	
		this.matchmaking.show();
		this.create_game.show();
		this.join.show();
	}

	resize() {
		this.create_game.size(consts.std_width, consts.std_height);
		this.create_game.style("font-size", consts.std_font_size.toString() + "px");
		this.create_game.style("border", (consts.DIAGONAL / 250).toString() + "px solid white");

		this.join.size(consts.std_width, consts.std_height);
		this.join.style("font-size", consts.std_font_size.toString() + "px");
		this.join.style("border", (consts.DIAGONAL / 250).toString() + "px solid white");

		this.matchmaking.size(consts.std_width, consts.std_height);
		this.matchmaking.style("font-size", consts.std_font_size.toString() + "px");
		this.matchmaking.style("border", (consts.DIAGONAL / 250).toString() + "px solid white");

		this.opponent_left_ok.size(consts.std_width, consts.std_height);
		this.opponent_left_ok.style("font-size", consts.std_font_size.toString() + "px");
	
		this.anyone_can_join.size(consts.medium_width, consts.medium_height);
		this.anyone_can_join.style("font-size", consts.medium_font_size.toString() + "px");
		this.anyone_can_join.style("border-width", (consts.DIAGONAL / 250).toString() + "px");
		this.invitation_only.size(consts.medium_width, consts.medium_height);
		this.invitation_only.style("font-size", consts.medium_font_size.toString() + "px");
		this.invitation_only.style("border-width", (consts.DIAGONAL / 250).toString() + "px");
		this.local.size(consts.medium_width, consts.medium_height);
		this.local.style("font-size", consts.medium_font_size.toString() + "px");
		this.local.style("border-width", (consts.DIAGONAL / 250).toString() + "px");
		this.ai.size(consts.medium_width, consts.medium_height);
		this.ai.style("font-size", consts.medium_font_size.toString() + "px");
		this.ai.style("border-width", (consts.DIAGONAL / 250).toString() + "px");
		this.validate.size(consts.medium_width, consts.medium_height);
		this.validate.style("font-size", consts.medium_font_size.toString() + "px");
		this.validate.style("border-width", (consts.DIAGONAL / 250).toString() + "px");
	
		this.plus.size(consts.small_square_diameter, consts.small_square_diameter);
		this.plus.style("font-size", consts.small_font_size.toString() + "px");
		this.minus.size(consts.small_square_diameter, consts.small_square_diameter);
		this.minus.style("font-size", consts.small_font_size.toString() + "px");
	
		this.return.size(consts.medium_square_diameter, consts.medium_square_diameter);
		this.return.style("font-size", consts.medium_font_size.toString() + "px");
		this.return.position(consts.WIDTH * 0.90, consts.HEIGHT * 0.01);
		
		this.sound.size(consts.small_square_diameter * 1.65, consts.small_square_diameter * 1.65);
		this.sound.position(consts.WIDTH * 0.80, consts.HEIGHT * 0.02);
	
		this.map_original.size(consts.WIDTH * 0.2 + consts.DIAGONAL * 0.025, consts.HEIGHT * 0.2 + consts.DIAGONAL * 0.025);
		this.map_original.style("font-size", consts.medium_font_size.toString() + "px");
		this.map_city.size(consts.WIDTH * 0.2 + consts.DIAGONAL * 0.025, consts.HEIGHT * 0.2 + consts.DIAGONAL * 0.025);
		this.map_city.style("font-size", consts.medium_font_size.toString() + "px");
		this.map_casino.size(consts.WIDTH * 0.2 + consts.DIAGONAL * 0.025, consts.HEIGHT * 0.2 + consts.DIAGONAL * 0.025);
		this.map_casino.style("font-size", consts.medium_font_size.toString() + "px");

		this.map_original.position(consts.WIDTH * 0.0855, consts.HEIGHT * 0.56);
		this.map_original.style("border-width", (consts.DIAGONAL / 250).toString() + "px");
		this.map_city.position(consts.WIDTH * 0.3855, consts.HEIGHT * 0.56);
		this.map_city.style("border-width", (consts.DIAGONAL / 250).toString() + "px");
		this.map_casino.position(consts.WIDTH * 0.6855, consts.HEIGHT * 0.56);
		this.map_casino.style("border-width", (consts.DIAGONAL / 250).toString() + "px");

		this.spectate.size(consts.WIDTH * 0.1, consts.HEIGHT * 0.1);
		this.spectate.style("border-width", (consts.DIAGONAL / 250).toString() + "px");
	}

	reset() {
		if (this.create_game)
			this.create_game.remove();
		this.create_game = null;
		if (this.join)
			this.join.remove();
		this.join = null;
		if (this.matchmaking)
			this.matchmaking.remove();
		this.matchmaking = null;
		if (this.return)
			this.return.remove();
		this.return = null;

		if (this.sound)
			this.sound.remove();
		this.sound = null;

		if (this.anyone_can_join)
			this.anyone_can_join.remove();
		this.anyone_can_join = null;
		if (this.invitation_only)
			this.invitation_only.remove();
		this.invitation_only = null;
		if (this.local)
			this.local.remove();
		this.local = null;
		if (this.ai)
			this.ai.remove();
		this.ai = null;
		if (this.validate)
			this.validate.remove();
		this.validate = null;

		if (this.plus)
			this.plus.remove();
		this.plus = null;
		if (this.minus)
			this.minus.remove();
		this.minus = null;
		if (this.opponent_left_ok)
			this.opponent_left_ok.remove();
		this.opponent_left_ok = null;

		if (this.map_original)
			this.map_original.remove();
		this.map_original = null;
		if (this.map_city)
			this.map_city.remove();
		this.map_city = null;
		if (this.map_casino)
			this.map_casino.remove();
		this.map_casino = null;

		if (this.spectate)
			this.spectate.remove();
		this.spectate = null;

		this.createButtons();
		this.resize();
	}

	hide() {
		this.create_game.hide();
		this.join.hide();
		this.return.hide();
		this.matchmaking.hide();
		this.sound.hide();
	
		this.anyone_can_join.hide();
		this.invitation_only.hide();
		this.local.hide();
		this.ai.hide();
		this.validate.hide();

		this.plus.hide();
		this.minus.hide();

		this.opponent_left_ok.hide();
	
		this.map_original.hide();
		this.map_city.hide();
		this.map_casino.hide();

		this.spectate.hide();
	}

	clickAnyone() {
		this.anyone_can_join.style("border", (consts.DIAGONAL / 250).toString() + "px solid white");
		this.local.style("border", "none");
		this.invitation_only.style("border", "none");
		
		this.ai.hide();
		this.ai.style("border", "none");
		game.ai = false;

		return "public";
	}

	clickLocal() {
		this.anyone_can_join.style("border", "none");
		this.local.style("border", (consts.DIAGONAL / 250).toString() + "px solid white");
		this.invitation_only.style("border", "none");

		this.ai.show();
		
		return "local";
	}

	clickInvitation() {
		this.anyone_can_join.style("border", "none");
		this.local.style("border", "none");
		this.invitation_only.style("border", (consts.DIAGONAL / 250).toString() + "px solid white");

		this.ai.hide();
		this.ai.style("border", "none");
		game.ai = false;

		return "private";
	}

	addParent() {
		this.create_game.parent(document.getElementById("button-create"));
		this.join.parent(document.getElementById("button-join"));
		this.matchmaking.parent(document.getElementById("button-matchmaking"));
		this.return.parent(document.getElementById("button-return"));
		this.sound.parent(document.getElementById("button-sound"));
		this.anyone_can_join.parent(document.getElementById("button-anyone"));
		this.local.parent(document.getElementById("button-local"));
		this.invitation_only.parent(document.getElementById("button-invitation"));
		this.ai.parent(document.getElementById("button-ai"));
		this.validate.parent(document.getElementById("button-validate"));
		this.plus.parent(document.getElementById("button-plus"));
		this.minus.parent(document.getElementById("button-minus"));
		this.opponent_left_ok.parent(document.getElementById("button-opp-left-ok"));

		this.map_original.parent(document.getElementById("button-map-original"));
		this.map_city.parent(document.getElementById("button-map-city"));
		this.map_casino.parent(document.getElementById("button-map-casino"));

		this.spectate.parent(document.getElementById("button-spectate"));
	}
};
