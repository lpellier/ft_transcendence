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
		this.players = [];
		this.pong = new Pong;
		this.score = [0, 0];
		this.timer = 3;
		this.state = "in-menu";
		this.room_id = "null";
		this.publicity = "public";
		this.local = false;
		this.framesSincePoint =0;
	}
};

class Errors {
	game_full : boolean;
	game_not_found : boolean;
	game_not_public : boolean;

	constructor() {
		this.game_full = false;
		this.game_not_found = false;
		this.game_not_public = false;
	}

	set_false() {
		this.game_full = false;
		this.game_not_found = false;
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
		// this.return.parent(document.getElementById("button-parent"));
		// this.anyone_can_join.parent(document.getElementById("button-parent"));
		// this.friends_can_join.parent(document.getElementById("button-parent"));
		// this.invitation_only.parent(document.getElementById("button-parent"));
		// this.validate.parent(document.getElementById("button-parent"));
	}
};

class Inputs {
	join : any;


	hide() {
		this.join.hide();
	}

	show() {
		this.join.show();
	}

	addClass() {
		let setClass : string = "p5-button";

		this.join.addClass(setClass);
	}
};
