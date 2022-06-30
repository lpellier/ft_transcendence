class MovingText {
    pos : Vector;
    vel : Vector;

    moving : boolean;

    left : boolean;

    text : string;
    initial_speed : number;
    slow_speed : number;
    
    constructor(x : number, y : number, left : boolean, text : string) {
        this.initial_speed = left ? consts.DIAGONAL * 0.030 : -consts.DIAGONAL * 0.030;
        this.slow_speed = left ? consts.DIAGONAL * 0.001 : -consts.DIAGONAL * 0.001;

        this.left = left;

        this.pos = new Vector([x, y]);
        this.vel = new Vector([this.initial_speed, 0]);
        
        this.text = text;
        this.moving = false;
    }

    calculatePos() {
        if (this.left) {
            if (this.pos.x > consts.WIDTH * 0.2 && this.pos.x < consts.WIDTH * 0.6)
                this.vel.lerp(new Vector([this.slow_speed, 0]), 1.25);
            else if (this.pos.x  > consts.WIDTH * 0.6)
                this.vel.lerp(new Vector([this.initial_speed * 4, 0]), 2);
            if (this.pos.x > consts.WIDTH + this.text.length * consts.std_font_size)
                this.moving = false;
        }
        else {
            if (this.pos.x > consts.WIDTH * 0.4 && this.pos.x < consts.WIDTH * 0.8)
                this.vel.lerp(new Vector([this.slow_speed, 0]), 1.25);
            else if (this.pos.x  < consts.WIDTH * 0.4)
                this.vel.lerp(new Vector([this.initial_speed * 4, 0]), 2);
            if (this.pos.x + this.text.length * consts.std_font_size < 0)
                this.moving = false;
        }
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
    }

    render() {
        push();
        fill("white");
        textAlign(CENTER);
        textSize(consts.std_font_size);
        text(this.text, this.pos.x, this.pos.y);
        pop();
    }
}