class Game {
	players : Player[];
	pong : Pong;
	score : [number, number];
	timer : number;
	state : string;
	room_id : string;
	publicity : string;
	local : boolean;
	framesSincePoint : number;

	constructor() {
		this.reset();
	}

	reset() {
		this.players = [];
		this.pong = null;
		this.score = [0, 0];
		this.timer = 4;
		this.state = "in-menu";
		this.room_id = "null";
		this.publicity = "public";
		this.local = false;
		this.framesSincePoint = 0;
	}
};

class Errors {
	game_full : boolean;
	game_not_found : boolean;
	game_not_public : boolean;

	constructor() {
		this.set_false();
	}

	set_false() {
		this.game_full = false;
		this.game_not_found = false;
		this.game_not_public = false;
	}
};

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
	}
};

class Inputs {
	join : any;

	constructor() {
		this.reset();
		this.create_inputs();
	}

	reset() {
		if (this.join)
			this.join.remove();
		this.join = null;
	}
		
	create_inputs() {
		this.join = create_input('');

		this.hide();
		this.addParent();
	}

	hide() {
		this.join.hide();
	}

	show() {
		this.join.show();
	}

	addParent() {
		this.join.parent(document.getElementById("input-join"));
	}
};
