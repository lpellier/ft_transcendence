export function random_room_id() {
	return (Math.random().toString(36).substring(2, 8));
}

function ccw(a : [number, number], b : [number, number], c : [number, number]) {
	return (c[1] - a[1]) * (b[0] - a[0]) > (b[1] - a[1]) * (c[0] - a[0]);
}

function intercept(x1 : number, y1 : number, x2 : number, y2 : number, x3 : number, y3 : number, x4 : number, y4 : number) : [number, number] {
	let denom = ((y4-y3) * (x2-x1)) - ((x4-x3) * (y2-y1));
	if (denom != 0) {
	  let ua = (((x4-x3) * (y1-y3)) - ((y4-y3) * (x1-x3))) / denom;
	  if ((ua >= 0) && (ua <= 1)) {
		let ub = (((x2-x1) * (y1-y3)) - ((y2-y1) * (x1-x3))) / denom;
		if ((ub >= 0) && (ub <= 1)) {
		  let x = x1 + (ua * (x2-x1));
		  let y = y1 + (ua * (y2-y1));
		  return [x, y];
		}
	  }
	}
	return null;
}

export function intersect(a : [number, number], b : [number, number], c : [number, number], d : [number, number], axis : string, side : string) : [boolean, number, string, string] {
	if (ccw(a, c, d) != ccw(b, c, d) && ccw(a, b, c) != ccw(a, b, d)) {
		// if ball trajectory crosses middle of paddle, sent back horizontally
		if (a[1] == b[1])
			return ([true, 0, axis, side]);
		const pt : [number, number] = intercept(a[0], a[1], b[0], b[1], c[0], c[1], d[0], d[1]);
		let relative : number;
		if (axis == "y") {
			relative = (c[1] + (d[1] - c[1]) / 2) - pt[1]; // middle of paddle minus hitpoint for relative intersection on y axis
			relative /= ((d[1] - c[1]) / 2);
		}
		else if (axis == "x") {
			relative = (c[0] + (d[0] - c[0]) / 2) - pt[0]; // middle of paddle minus hitpoint for relative intersection on x axis
			relative /= ((d[0] - c[0]) / 2);
		}
		let bounce_angle = relative * ((5 * Math.PI) / 12);
		return [true, bounce_angle, axis, side];
	}
	return [false, 0, axis, side];
}