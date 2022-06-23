
let canvas_width = 700;
let canvas_height = 500;

let bumper;
let pong;

let collision = new p5.Vector(0, 0);
let perp = new p5.Vector(0, 0);

// ? How to calculate bounce angle from point of intersection of pong velocity (v) and bumper (b)
// ? when collision is detected, get the perpendicular line (pl) to the tangent (t) of the point of collision (pt)
// ? Calculate the angle alpha between v and pl ; calculate line with angle alpha to pl

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
	constructor(x, y, diameter, bumper_pos) {
		this.pos = new p5.Vector(x, y);
		this.diameter = diameter;
		this.velocity = new p5.Vector(bumper_pos.x - this.pos.x - random(-20, 20), bumper_pos.y - this.pos.y - random(-20, 20));
		
		this.velocity.normalize().mult(5);
	}

	render() {
		rect(this.pos.x, this.pos.y, this.diameter, this.diameter);
	}

	move() {
		this.pos.add(this.velocity);
		if (this.pos.x < 0)
			this.pos.x = canvas_width;
		else if (this.pos.x > canvas_width)
			this.pos.x = 0;
		if (this.pos.y < 0)
			this.pos.y = canvas_height;
		else if (this.pos.y > canvas_height)
			this.pos.y = 0;

	}

	posNextFrame() {
		return p5.Vector.add(this.pos, this.velocity);
	}
	
	checkCollision(object) {
		let e = new p5.Vector(this.pos.x, this.pos.y);
		let l = new p5.Vector(this.posNextFrame().x, this.posNextFrame().y);

		let cp = new p5.Vector(object.pos.x, object.pos.y);
		let r = object.diameter / 2;

		let d = p5.Vector.sub(l, e);
		let f = p5.Vector.sub(e, cp);

		let a = d.dot(d);
		let b = 2 * f.dot(d);
		let c = f.dot(f) - r * r;

		let discriminant = b * b - 4 * a * c;
		if (discriminant >= 0) {
			discriminant = Math.sqrt(discriminant);

			let t1 = (-b - discriminant) / (2 * a);
			let t2 = (-b + discriminant) / (2 * a);
			
			// 3x HIT cases:
			//          -o->             --|-->  |            |  --|->
			// Impale(t1 hit,t2 hit), Poke(t1 hit,t2>1), ExitWound(t1<0, t2 hit), 

			// 3x MISS cases:
			//       ->  o                     o ->              | -> |
			// FallShort (t1>1,t2>1), Past (t1<0,t2<0), CompletelyInside(t1<0, t2>1)
			
			if( t1 >= 0 && t1 <= 1 )
			{
				// t1 is the intersection, and it's closer than t2
				// (since t1 uses -b - discriminant)
				// Impale, Poke
				collision = p5.Vector.add(e, t1);
			}

			// here t1 didn't intersect so we are either started
			// inside the sphere or completely past it
			// if( t2 >= 0 && t2 <= 1 )
			// {
			// 	// ExitWound
			// 	console.log("hit from inside");
			// }
			
			// // no intn: FallShort, Past, CompletelyInside
			// console.log("miss");
		}
	}
}

let pongs = [];

function setup() {
	createCanvas(canvas_width, canvas_height);
	bumper = new Circle(canvas_width / 2, canvas_height / 2, 50);
	pong = new Square(random(canvas_width), random(canvas_height), 10, bumper.pos);

	for (let i = 0; i < 50; i++)
		pongs.push(new Square(random(canvas_width), random(canvas_height), 10, bumper.pos));
}

function mousePressed() {
	pong.pos.x = mouseX;
	pong.pos.y = mouseY;
	
	pong.velocity = new p5.Vector(bumper.pos.x - pong.pos.x - random(-20, 20), bumper.pos.y - pong.pos.y - random(-20, 20));
	pong.velocity.normalize().mult(5);
}

function draw() {
	clear();
	background(0);
	bumper.render();

	for (let i = 0; i < 50; i++) {
		pongs[i].render();
		pongs[i].move();
		pongs[i].checkCollision(bumper);
		if (collision.x != 0) {
			perp = p5.Vector.sub(collision, bumper.pos);
			pongs[i].velocity = perp;
			console.log(perp)
			pongs[i].velocity.normalize().mult(5);
			collision.x = 0;
			collision.y = 0;
			// perp.rotate(pong.velocity.angleBetween(perp));
			// pong.velocity = perp;
			// pong.velocity.normalize().mult(5);
		}
	}
}