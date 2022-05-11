class Buttons {
	create_game : any;
	join : any;
	local : any;
	return : any;
	matchmaking : any;

	anyone_can_join : any;
	friends_can_join : any;
	invitation_only : any;
	validate : any;

	plus : any;
	minus : any;

	opponent_left_ok : any;

	constructor() {
		this.reset();
		this.createButtons();
	}
	
	createButtons() {
		this.create_game = createCustomButton("Create game", createGameMenu);
		this.join = createCustomButton("Join game", readRoomID);
		this.matchmaking = createCustomButton("Match making", matchmaking);
		this.local = createCustomButton("Play local", startLocal);
		this.return = createCustomButton("", goToMainMenu, highlightButton, resetButton, consts.medium_square_diameter, consts.medium_square_diameter);
		this.return.style("border", "none");
		this.return.style("background-color", "rgba(0, 0, 0, 0)");
		
		this.anyone_can_join = createCustomButton("Anyone can join", clickAnyone, highlightButton, resetButton, consts.medium_width, consts.medium_height);
		this.anyone_can_join.style("background-color", "rgba(0, 0, 0, 0)");
		this.anyone_can_join.style("font-size", consts.medium_font_size.toString() + "px");
		this.anyone_can_join.style("outline", "5px solid");
		this.anyone_can_join.style("border", "none");
		this.friends_can_join = createCustomButton("Friends can join", clickFriends, highlightButton, resetButton, consts.medium_width, consts.medium_height);
		this.friends_can_join.style("background-color", "rgba(0, 0, 0, 0)");
		this.friends_can_join.style("font-size", consts.medium_font_size.toString() + "px");
		this.friends_can_join.style("border", "none");
		this.invitation_only = createCustomButton("Invitation only", clickInvitation, highlightButton, resetButton, consts.medium_width, consts.medium_height);
		this.invitation_only.style("background-color", "rgba(0, 0, 0, 0)");
		this.invitation_only.size(consts.medium_width, consts.medium_height);
		this.invitation_only.style("border", "none");
		this.invitation_only.style("font-size", consts.medium_font_size.toString() + "px");
		this.validate = createCustomButton('Create', createGame, highlightButton, resetButton, consts.medium_width, consts.medium_height);
		this.validate.style("background-color", "rgba(0, 0, 0, 0)");
		this.validate.style("font-size", consts.medium_font_size.toString() + "px");
		
		this.plus = createCustomButton("+", plusScoreLimit, highlightButton, resetButton, consts.small_square_diameter, consts.small_square_diameter);
		this.plus.style("border", "none");
		this.plus.style("font-size", consts.small_font_size.toString() + "px");
		this.minus = createCustomButton("-", minusScoreLimit, highlightButton, resetButton, consts.small_square_diameter, consts.small_square_diameter);
		this.minus.style("border", "none");
		
		this.opponent_left_ok = createCustomButton("OK", goToMainMenu, highlightButton, resetButton);
		this.opponent_left_ok.style("border", "none");
		this.minus.style("font-size", consts.small_font_size.toString() + "px");

		this.hide();
		this.addParent();
	
		this.local.show();
		this.matchmaking.show();
		this.create_game.show();
		this.join.show();
	}

	resize() {
		this.create_game.size(consts.std_width, consts.std_height);
		this.create_game.style("font-size", consts.std_font_size.toString() + "px");
		this.join.size(consts.std_width, consts.std_height);
		this.join.style("font-size", consts.std_font_size.toString() + "px");
		this.matchmaking.size(consts.std_width, consts.std_height);
		this.matchmaking.style("font-size", consts.std_font_size.toString() + "px");
		this.local.size(consts.std_width, consts.std_height);
		this.local.style("font-size", consts.std_font_size.toString() + "px");
		this.opponent_left_ok.size(consts.std_width, consts.std_height);
		this.opponent_left_ok.style("font-size", consts.std_font_size.toString() + "px");
	
		this.anyone_can_join.size(consts.medium_width, consts.medium_height);
		this.anyone_can_join.style("font-size", consts.medium_font_size.toString() + "px");
		this.friends_can_join.size(consts.medium_width, consts.medium_height);
		this.friends_can_join.style("font-size", consts.medium_font_size.toString() + "px");
		this.invitation_only.size(consts.medium_width, consts.medium_height);
		this.invitation_only.style("font-size", consts.medium_font_size.toString() + "px");
		this.validate.size(consts.medium_width, consts.medium_height);
		this.validate.style("font-size", consts.medium_font_size.toString() + "px");
	
		this.plus.size(consts.small_square_diameter, consts.small_square_diameter);
		this.plus.style("font-size", consts.small_font_size.toString() + "px");
		this.minus.size(consts.small_square_diameter, consts.small_square_diameter);
		this.minus.style("font-size", consts.small_font_size.toString() + "px");
	
		this.return.size(consts.medium_square_diameter, consts.medium_square_diameter);
		this.return.style("font-size", consts.medium_font_size.toString() + "px");
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
		if (this.local)
			this.local.remove();
		this.local = null;
		if (this.return)
			this.return.remove();
		this.return = null;

		if (this.anyone_can_join)
			this.anyone_can_join.remove();
		this.anyone_can_join = null;
		if (this.friends_can_join)
			this.friends_can_join.remove();
		this.friends_can_join = null;
		if (this.invitation_only)
			this.invitation_only.remove();
		this.invitation_only = null;
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
	}

	hide() {
		this.create_game.hide();
		this.join.hide();
		this.local.hide();
		this.return.hide();
		this.matchmaking.hide();
	
		this.anyone_can_join.hide();
		this.friends_can_join.hide();
		this.invitation_only.hide();
		this.validate.hide();

		this.plus.hide();
		this.minus.hide();

		this.opponent_left_ok.hide();
	}

	clickAnyone() {
		this.anyone_can_join.style("outline", "5px solid");
		this.friends_can_join.style("outline", "none");
		this.invitation_only.style("outline", "none");

		return "public";
	}

	clickFriends() {
		this.anyone_can_join.style("outline", "none");
		this.friends_can_join.style("outline", "5px solid");
		this.invitation_only.style("outline", "none");

		return "private/friends";
	}

	clickInvitation() {
		this.anyone_can_join.style("outline", "none");
		this.friends_can_join.style("outline", "none");
		this.invitation_only.style("outline", "5px solid");

		return "private";
	}

	addParent() {
		this.create_game.parent(document.getElementById("button-create"));
		this.join.parent(document.getElementById("button-join"));
		this.matchmaking.parent(document.getElementById("button-matchmaking"));
		this.local.parent(document.getElementById("button-local"));
		this.return.parent(document.getElementById("button-return"));
		this.anyone_can_join.parent(document.getElementById("button-anyone"));
		this.friends_can_join.parent(document.getElementById("button-friends"));
		this.invitation_only.parent(document.getElementById("button-invitation"));
		this.validate.parent(document.getElementById("button-validate"));
		this.plus.parent(document.getElementById("button-plus"));
		this.minus.parent(document.getElementById("button-minus"));
		this.opponent_left_ok.parent(document.getElementById("button-opp-left-ok"));
	}
};
