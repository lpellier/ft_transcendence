class Inputs {
	join : any;
	score_limit : any;

	constructor() {
		this.reset();
		this.create_inputs();
	}

	reset() {
		if (this.join)
			this.join.remove();
		this.join = null;
		if (this.score_limit)
			this.score_limit.remove();
		this.score_limit = null;
	}
		
	create_inputs() {
		this.join = create_input('');
		this.join.size(600, 75);
		
		this.score_limit = create_input('');
		this.score_limit.size(100, 75);
		this.score_limit.attribute("disabled", "true");

		this.hide();
		this.addParent();
	}

	hide() {
		this.join.hide();
		this.score_limit.hide();
	}

	addParent() {
		this.join.parent(document.getElementById("input-join"));
		this.score_limit.parent(document.getElementById("input-score_limit"));
	}
};
