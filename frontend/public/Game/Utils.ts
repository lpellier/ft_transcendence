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
		this.create_game.attribute("display", "flex");
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

	addClass() {
		let setClass : string = "p5-button";

		this.create_game.addClass(setClass);
		// this.create_game.addClass("tableau");
		this.create_game.addClass("button-create");
		this.join.addClass(setClass);
		// this.join.addClass("tableau");
		this.join.addClass("button-join");
		this.local.addClass(setClass);
		// this.local.addClass("tableau");
		this.local.addClass("button-local");
		this.matchmaking.addClass(setClass);
		// this.matchmaking.addClass("tableau");
		this.matchmaking.addClass("button-matchmaking");
		this.return.addClass(setClass);
		// this.return.addClass("tableau");
		// this.return.addClass("tableau");
		this.anyone_can_join.addClass(setClass);
		// this.anyone_can_join.addClass("tableau");
		// this.anyone_can_join.addClass("tableau");
		this.friends_can_join.addClass(setClass);
		// this.friends_can_join.addClass("tableau");
		// this.friends_can_join.addClass("tableau");
		this.invitation_only.addClass(setClass);
		// this.invitation_only.addClass("tableau");
		// this.invitation_only.addClass("tableau");
		this.validate.addClass(setClass);
		// this.validate.addClass("tableau");
		// this.validate.addClass("tableau");
	}

	addParent() {
		this.create_game.parent(canvas);
		this.join.parent(canvas);
		this.local.parent(canvas);
		this.matchmaking.parent(canvas);
		this.return.parent(canvas);
		this.anyone_can_join.parent(canvas);
		this.friends_can_join.parent(canvas);
		this.invitation_only.parent(canvas);
		this.validate.parent(canvas);
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
