// ? P to quit local mode
// ? Coding consistency : snake_case for variables | camelCase for functions | PascalCase for classes
// ? Map indexes : 1 (normal map), 2 (city map), 3 (casino map)

// TODO Brainstorm a better idea than walls in the middle for City
	// ? bumper in middle of map ? make an animation for bump

// TODO find a way to send data to database and fill every appropriate field when situation calls for it

// TODO cute animation showing the roll of pong value in casino
// TODO comment EVERYTHING

// ? How to calculate bounce angle from point of intersection of pong velocity (v) and bumper (b)
// ? when collision is detected, get the perpendicular line (pl) to the tangent (t) of the point of collision (pt)
// ? Calculate the angle alpha between v and pl ; calculate line with angle alpha to pl

function sub(v1 : Vector, v2 : Vector) : Vector {
	let ret : Vector = new Vector([v1.x, v1.y]);
	ret.x -= v2.x;
	ret.y -= v2.y;
	return ret;
}

class Vector {
	x : number;
	y : number;

	constructor(pos : [number, number]) {
		this.x = pos[0];
		this.y = pos[1];
	}

	add(other : Vector) {
		this.x += other.x;
		this.y += other.y;
	}

	mult(nbr : number) {
		this.x *= nbr;
		this.y *= nbr;
	}

	mag() {
		return (Math.sqrt(this.x * this.x + this.y * this.y));
	}

	normalize() {
		this.x /= this.mag();
		this.y /= this.mag();
	}

	dot(other : Vector) : number {
		let ret : number = 0;

		ret += this.x * other.x;
		ret += this.y * other.y;
		return ret;
	}
}

class Bumper {
	animation : any;
	pos : Vector;
	center : Vector;
	speed : number;
	len : number;
	index : number;
	diameter : number;

	hit : boolean;
	collision : Vector;
	bounce_vec : Vector;

	constructor(animation : any, x : number, y : number, diameter : number) {
		this.pos = new Vector([x, y]);
		this.center = new Vector([x + diameter / 2, y + diameter / 2])
		this.collision = new Vector([0, 0]);
		this.bounce_vec = new Vector([0, 0]);
		this.animation = animation;
		this.len = this.animation.length;
		this.index = 0;
		this.hit = false;
		this.diameter = diameter;
	}
  
	show() {
	  let index = this.index % this.len;
	  image(this.animation[index], this.pos.x, this.pos.y, this.diameter, this.diameter);
	}
  
	animate() {
		this.index += 1;
		if (this.index >= this.len) {
			this.index = 0;
			this.hit = false;
		}
	}

	render() {
		this.show();
		if (this.hit)
			this.animate();
	}

	checkCollision(pong : Pong) {
		let e = new Vector(pong.center());
		let l = new Vector(pong.centerNextFrame());

		let cp = this.center;
		let r = (this.diameter * 0.85) / 2;

		let d = sub(l, e);
		let f = sub(e, cp);

		let a = d.dot(d);
		let b = 2 * f.dot(d);
		let c = f.dot(f) - r * r;

		let discriminant = b * b - 4 * a * c;
		if (discriminant >= 0) {
			discriminant = Math.sqrt(discriminant);

			let t1 = (-b - discriminant) / (2 * a);
			
			if( t1 >= 0 && t1 <= 1 )
			{
				// t1 is the intersection, and it's closer than t2
				// (since t1 uses -b - discriminant)
				// Impale, Poke
				this.collision.x = e.x + t1;
				this.collision.y = e.y;
				this.hit = true;
				
				this.bounce_vec = sub(this.collision, this.center);
				this.bounce_vec.normalize();
				let vec_pong = new Vector(pong.velocity);
				this.bounce_vec.mult(vec_pong.mag());
				pong.velocity[0] = this.bounce_vec.x;
				pong.velocity[1] = this.bounce_vec.y;
			}
		}
	}
  }

let spritesheet : any;
let spritedata : any;

let animation : any[] = [];
let bumpers : any[] = [];

let should_load : boolean = false;

let consts : Consts = null;
let game : Game = null;
let errors : Errors = null;
let buttons : Buttons = null;
let inputs : Inputs = null;
let keys : Keys = null;

let canvas : any = null;
let socket : any = null;

function preload() {
	consts = new Consts();
	keys = new Keys();

	spritedata = loadJSON('/assets/sprites/bumper.json');
  	spritesheet = loadImage('/assets/sprites/bumper.png');
}

function setup() {
	let frames = spritedata.frames;
	for (let i = 0; i < frames.length; i++) {
		let pos = frames[i].position;
		let img = spritesheet.get(pos.x, pos.y, pos.w, pos.h);
		for (let j = 0; j < frames[i].time; j++)
			animation.push(img);
	}
	let diameter = consts.DIAGONAL * 0.10;

	bumpers.push(new Bumper(animation, consts.WIDTH / 2 - diameter / 2, consts.HEIGHT * 1 / 3 - diameter / 2, diameter));
	bumpers.push(new Bumper(animation, consts.WIDTH / 2 - diameter / 2, consts.HEIGHT * 2 / 3 - diameter / 2, diameter));


	keys.init();
	game = new Game();
	inputs = new Inputs();
	errors = new Errors();
	buttons = new Buttons();
	
	
	canvas = createCanvas(consts.WIDTH, consts.HEIGHT);
	canvas.parent(document.getElementById("canvas-parent"));
	background(0);
	textFont(consts.FONT);
	frameRate(60);
	
	// @ts-ignore:next-line
	socket = io("http://127.0.0.1:3001");
	
	socket.on("connect", () => {
		socket.emit("my_id", socket.id);
	});

	listenStartEvents();
	listenStopEvents();
	listenMoveEvents();
	
	resizeEverything();
}

function hideIcons() {
	keys.hide();
	consts.MARK_ICON.hide();
	consts.CROSS_ICON.hide();
	consts.CROSS_ICON2.hide();
}

function draw() {
	clear(0, 0, 0, 0);
	hideIcons();
	background(0);
	if (!document.getElementById("canvas-parent")) {
		socket.emit("quit-ongoing-game");
		should_load = true;
		return ;
	}
	else if (should_load)
		inMainMenu();
	if (game.state === "waiting-player" || game.state === "waiting-readiness" || game.state === "countdown" || game.state === "in-game")
		game.map.render(1);
	if (game.state === "in-menu-input" || game.state === "waiting-player" || game.state === "in-menu-create")
		image(consts.RETURN_ICON, consts.WIDTH * 0.90, consts.HEIGHT * 0.01, consts.medium_square_diameter, consts.medium_square_diameter);
	if (game.state === "in-menu-create") {
		drawMinimaps();
		outputAnnouncement("Game Creation", consts.std_font_size, consts.WIDTH / 2, consts.HEIGHT / 7, "white");
		outputAnnouncement("score limit   ", consts.medium_font_size, consts.WIDTH * 1.20 / 5, consts.HEIGHT * 0.48, "white")
	}
	if (game.state === "opponent-left-menu" && game.spectator === true)
		outputAnnouncement("A player left", consts.std_font_size, consts.WIDTH / 2, consts.HEIGHT / 2, "white");
	else if (game.state === "opponent-left-menu")
		outputAnnouncement("Your opponent left", consts.std_font_size, consts.WIDTH / 2, consts.HEIGHT / 2, "white");
	if (game.state === "in-menu")
		outputAnnouncement("CyberPong 1977", consts.std_font_size * 1.5, consts.WIDTH / 2, consts.HEIGHT / 4, "white");
	else if (game.state === "in-menu-input") {
		drawSpectate();
		outputAnnouncement("Enter Room ID", consts.std_font_size, consts.WIDTH / 2, consts.HEIGHT * 2 / 5, "white")
		if (errors.game_full)
			outputAnnouncement("This game is already full", consts.small_font_size, consts.WIDTH / 2, consts.HEIGHT / 2, "white");
		else if (errors.game_not_found)
			outputAnnouncement("This game doesn't exist", consts.small_font_size, consts.WIDTH / 2, consts.HEIGHT / 2, "white");	
	}
	else if (game.state === "waiting-player") {
		if (game.spectator)
			drawSpectate();
		buttons.return.show();
		image(consts.RETURN_ICON, consts.WIDTH * 0.90, consts.HEIGHT * 0.01, consts.medium_square_diameter, consts.medium_square_diameter);
		outputAnnouncement("WAITING FOR ANOTHER PLAYER", consts.medium_font_size, consts.WIDTH / 2, consts.HEIGHT / 2, "white");
	}
	else if (game.state === "waiting-readiness") {
		if (game.spectator)
			drawSpectate();
		drawPlayerReadiness();
		outputAnnouncement("PLEASE PRESS SPACE TO START THE GAME", consts.medium_font_size, consts.WIDTH / 2, consts.HEIGHT / 2, "white");
	}
	else if (game.state === "countdown") {
		if (game.spectator)
			drawSpectate();
		outputCountdown();
		if (!game.local && !game.spectator)
			drawHelp();
		if (!game.spectator)
			drawInput();
		for (let i : number = 0; i < game.players.length; i++)
			game.players[i].render();
	}
	else if (game.state === "in-game") {
		if (game.spectator)
			drawSpectate();
		movePlayers();
		if (game.state === "in-game") {
			for (let i : number = 0; i < game.players.length; i++)
				game.players[i].render();
			game.pong.render();
			if (game.map.name === "city") {
				for (let bumper of bumpers) {
					bumper.render();
					bumper.checkCollision(game.pong);
				}
			}
		}
		if (game.frames_since_point < 180 && game.map.name === "casino")
			outputAnnouncement(game.pong.value + (game.pong.value === 1 ? " point" : " points"), consts.std_font_size, consts.WIDTH * 0.5, consts.HEIGHT * 0.95, game.pong.color);
	}
	else if (game.state === "game-over") {
		buttons.return.show();
		image(consts.RETURN_ICON, consts.WIDTH * 0.90, consts.HEIGHT * 0.01, consts.medium_square_diameter, consts.medium_square_diameter);
		outputAnnouncement((game.score[0] > game.score[1] ? "Player 1 " : "Player 2 ") + "won the game!", consts.std_font_size, width / 2, height / 2, "white")
	}
	
}
