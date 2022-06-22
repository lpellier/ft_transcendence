class Circle {
	constructor(x, y, diameter) {
		this.pos = new p5.Vector(x, y);
		this.diameter = diameter;
	}

	render() {
		circle(this.pos.x, this.pos.y, this.diameter);
	}
}

class Square {
	constructor(x, y, diameter) {
		this.pos = new p5.Vector(x, y);
		this.diameter = diameter;
		this.velocity = new p5.Vector(-5, 0);
	}

	render() {
		rect(this.pos.x, this.pos.y, this.diameter, this.diameter);
	}

	move() {
		this.pos.add(this.velocity);
		if (this.pos.x < 0)
			this.pos.x = 500;
	}
}

let bumper = new Circle(50, 50, 25);
let pong = new Square(200, 50, 10);

function setup() {
	createCanvas(500, 500);
}

function draw() {
	clear();
	background(0);
	bumper.render();
	pong.render();
	pong.move();
}