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
		this.join = createCustomInput('');
		this.join.size(consts.WIDTH / 1.75, consts.HEIGHT / 8);
		
		this.score_limit = createCustomInput('');
		this.score_limit.attribute("disabled", "true");
		this.score_limit.size(consts.WIDTH / 12, consts.HEIGHT / 10);
		this.hide();
		this.addParent();
	}

	resize() {
		this.join.size(consts.WIDTH / 1.75, consts.HEIGHT / 8);
		this.join.style("font-size", (consts.std_font_size).toString() + "px");
		this.score_limit.size(consts.WIDTH / 12, consts.HEIGHT / 10);
		this.score_limit.style("font-size", (consts.std_font_size).toString() + "px");
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
