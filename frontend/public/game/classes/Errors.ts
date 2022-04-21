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
