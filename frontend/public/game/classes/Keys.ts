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
		this.a = createImg("/assets/keys/tile-a.png", "a-key-png");
		this.s = createImg("/assets/keys/s-key.gif", "s-key-gif");
		this.d = createImg("/assets/keys/tile-d.png", "d-key-png");
		this.up = createImg("/assets/keys/up-key.gif", "up-key-gif");
		this.left = createImg("/assets/keys/tile-left.png", "left-key-png");
		this.down = createImg("/assets/keys/down-key.gif", "down-key-gif");
		this.right = createImg("/assets/keys/tile-right.png", "right-key-png");
		this.space = createImg("/assets/keys/space-key.gif", "space-key-gif");	
	}
	
	init() {
		this.w.size(75, 75);
		this.w.parent("w-key");
		this.a.size(75, 75);
		this.a.parent("a-key");
		this.s.size(75, 75);
		this.s.parent("s-key");
		this.d.size(75, 75);
		this.d.parent("d-key");
		
		this.up.size(75, 75);
		this.up.parent("up-key");
		this.left.size(75, 75);
		this.left.parent("left-key");
		this.down.size(75, 75);
		this.down.parent("down-key");
		this.right.size(75, 75);
		this.right.parent("right-key");
		
		this.space.size(150, 75);
		// this.space.parent("space-key");
		this.hide();
	}
	
	hide() {
		this.w.hide();
		this.a.hide();
		this.s.hide();
		this.d.hide();
		this.up.hide();
		this.left.hide();
		this.down.hide();
		this.right.hide();
		this.space.hide();	
	}
};
