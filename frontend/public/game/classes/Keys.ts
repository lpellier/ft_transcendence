class Keys {
	w : any;
	a : any;
	s : any;
	d : any;

	up : any;
	left : any;
	down : any;
	right : any;

	space : any;

	constructor() {
		this.w = createImg("/assets/keys/w-key.gif", "w-key-gif");
		this.w.size(75, 75);
		// this.w.hide();
		this.w.parent("w-key");
		this.a = createImg("/assets/keys/a-key.gif", "a-key-gif");
		this.a.size(75, 75);
		// this.a.hide();
		this.a.parent("a-key");
		this.s = createImg("/assets/keys/s-key.gif", "s-key-gif");
		this.s.size(75, 75);
		// this.s.hide();
		this.s.parent("s-key");
		this.d = createImg("/assets/keys/d-key.gif", "d-key-gif");
		this.d.size(75, 75);
		// this.d.hide();
		this.d.parent("d-key");
		
		this.up = createImg("/assets/keys/up-key.gif", "up-key-gif");
		this.up.size(75, 75);
		this.up.hide();
		this.left = createImg("/assets/keys/left-key.gif", "left-key-gif");
		this.left.size(75, 75);
		this.left.hide();
		this.down = createImg("/assets/keys/down-key.gif", "down-key-gif");
		this.down.size(75, 75);
		this.down.hide();
		this.right = createImg("/assets/keys/right-key.gif", "right-key-gif");
		this.right.size(75, 75);
		this.right.hide();
		
		this.space = createImg("/assets/keys/space-key.gif", "space-key-gif");	
		this.space.size(75, 75);
		this.space.hide();
	}
};
