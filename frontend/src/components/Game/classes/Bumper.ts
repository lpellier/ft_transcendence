
class Bumper {
	animation : any;
	pos : Vector;
	center : Vector;
	speed : number;
	len : number;
	index : number;
	diameter : number;

	index_bumper : number;

	hit : boolean;
	collision : Vector;
	bounce_vec : Vector;

	frame_count_shake : number;

	constructor(animation : any, x : number, y : number, diameter : number, index : number) {
		this.pos = new Vector([x, y]);
		this.center = new Vector([x + diameter / 2, y + diameter / 2])
		this.collision = new Vector([0, 0]);
		this.bounce_vec = new Vector([0, 0]);
		this.animation = animation;
		this.len = this.animation.length;
		this.index = 0;
		this.hit = false;
		this.diameter = diameter;
		this.index_bumper = index;
		this.frame_count_shake = 0;
	}

	resize() {
		let diameter = consts.DIAGONAL * 0.10;

		this.diameter = diameter;

		this.pos.x = consts.WIDTH / 2 - diameter / 2;
		if (this.index_bumper === 1)
			this.pos.y = consts.HEIGHT * 1 / 4 - diameter / 2;	
		else if (this.index_bumper === 2)
			this.pos.y = consts.HEIGHT * 3 / 4 - diameter / 2;	
		this.center.x = this.pos.x + diameter / 2;
		this.center.y = this.pos.y + diameter / 2;
	}
  
	show(ratio : number) {
		let index = this.index % this.len;
		push();
		if (this.hit && this.frame_count_shake < 30)
			translate(Math.floor(random(-5, 6)), Math.floor(random(-5, 6)))
		image(this.animation[index], this.pos.x * ratio, this.pos.y * ratio, this.diameter * ratio, this.diameter * ratio);
		pop();
	}
  
	animate() {
		this.index += 1;
		this.frame_count_shake++;
		if (this.index >= this.len) {
			this.index = 0;
			this.hit = false;
		}
	}

	resetAnimation() {
		this.index = 0;
		this.frame_count_shake = 0;
	}

	render(ratio : number) {
		this.show(ratio);
		if (this.hit)
			this.animate();
	}

	checkCollision(pong : Pong) {
		let e = new Vector(pong.center());
		let l = new Vector(pong.centerNextFrame());

		let cp = this.center;
		let r = (this.diameter * 0.85) / 2;

		let d = sub_vec(l, e);
		let f = sub_vec(e, cp);

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
				
				this.bounce_vec = sub_vec(this.collision, this.center);
				this.bounce_vec.normalize();
				let vec_pong = new Vector(pong.velocity);
				this.bounce_vec.mult(vec_pong.mag());
				pong.velocity[0] = this.bounce_vec.x;
				pong.velocity[1] = this.bounce_vec.y;
				return true;
			}
		}
		return false;
	}
  }