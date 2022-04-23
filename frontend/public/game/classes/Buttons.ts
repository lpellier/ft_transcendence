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

	constructor() {
		this.reset();
		this.create_buttons();
	}
	
	create_buttons() {
		this.create_game = create_button("Create a game", createGameMenu);
		this.join = create_button("Join game", readRoomID);
		this.matchmaking = create_button("Match making", matchmaking);
		this.local = create_button("Play local", startLocal);
		this.return = create_button("", in_main_menu, highlightButton, resetButton, 100, 100);
		this.return.style("border", "none");
		this.return.style("background-color", "rgba(0, 0, 0, 0)");
		
		this.anyone_can_join = create_button("Anyone can join", click_anyone, highlightButton, resetButton, 350, 75);
		this.anyone_can_join.style("background-color", "rgba(0, 0, 0, 0)");
		this.anyone_can_join.style("font-size", "25px");
		this.anyone_can_join.style("outline", "5px solid");
		this.anyone_can_join.style("border", "none");
		this.friends_can_join = create_button("Friends can join", click_friends, highlightButton, resetButton, 350, 75);
		this.friends_can_join.style("background-color", "rgba(0, 0, 0, 0)");
		this.friends_can_join.style("font-size", "25px");
		this.friends_can_join.style("border", "none");
		this.invitation_only = create_button("Invitation only", click_invitation, highlightButton, resetButton, 350, 75);
		this.invitation_only.style("background-color", "rgba(0, 0, 0, 0)");
		this.invitation_only.style("font-size", "25px");
		this.invitation_only.style("border", "none");
		this.validate = create_button('Create', createGame, highlightButton, resetButton, 300, 50);
		this.validate.style("background-color", "rgba(0, 0, 0, 0)");
		this.validate.style("font-size", "25px");
		
		this.plus = create_button("+", plusScoreLimit, highlightButton, resetButton, 50, 50);
		this.plus.style("border", "none");
		this.minus = create_button("-", minusScoreLimit, highlightButton, resetButton, 50, 50);
		this.minus.style("border", "none");
		
		this.hide();
		this.addParent();
	
		this.local.show();
		this.matchmaking.show();
		this.create_game.show();
		this.join.show();
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
	}

	show() {
		this.create_game.show();
		this.join.show();
		this.local.show();
		this.return.show();
		this.matchmaking.show();

		this.anyone_can_join.show();
		this.friends_can_join.show();
		this.invitation_only.show();
		this.validate.show();

		this.plus.show();
		this.minus.show();	
	}

	click_anyone() {
		this.anyone_can_join.style("outline", "5px solid");
		this.friends_can_join.style("outline", "none");
		this.invitation_only.style("outline", "none");

		return "public";
	}

	click_friends() {
		this.anyone_can_join.style("outline", "none");
		this.friends_can_join.style("outline", "5px solid");
		this.invitation_only.style("outline", "none");

		return "private/friends";
	}

	click_invitation() {
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
	}
};
