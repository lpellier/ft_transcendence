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
