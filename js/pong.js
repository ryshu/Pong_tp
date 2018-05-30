function randint(min, max) {
  return Math.floor(Math.random() * Math.floor(max-min) + min);
}

class Color{
	constructor(red, green, blue){
		this.red = randint(50,250);
		this.green = randint(50,250);
		this.blue = randint(50,250);
	}

	reset(){
		this.red = randint(50,250);
		this.green = randint(50,250);
		this.blue = randint(50,250);
	}

	fill(ctx){
		ctx.fillStyle = "#"+(this.red).toString(16)+(this.green).toString(16)+(this.blue).toString(16);
		ctx.fill();
	}
}

class Form{
	constructor(ctx, x , y , h , w){
		this.elmt = document.getElementById("boardgame");
		this.ctx = ctx;
		this.height = h;
		this.width = w;
		this.x = x;
		this.y = y;
		this.direction = randint(4);
		this.color = new Color();
	}

	draw(){ }

	collision(e){
		var left = this.x + this.dx;
		var right = this.x + this.dx+this.height;
		var top = this.y + this.dy;
		var bottom = this.y + this.dy+ this.width;
		var ex = e.x + e.width;
		var ey = e.y + e.height;
		if( left < ex && right > e.x && top < ey && bottom > e.y) {
			this.dx = -this.dx;
			this.dy = -this.dy;
			this.color.reset();
			e.color.reset();
		}
	}
}

class Wall extends Form{
	constructor(ctx, x , y , h , w){
		super(ctx, x , y, h, w);
		this.coef = randint(4);
	}

	draw(){
		this.ctx.beginPath();
		this.ctx.rect(this.x, this.y, this.width, this.height);
		this.color.fill(this.ctx);
		this.ctx.closePath();
	}

	checkBorder(){ }
} 

class Moving extends Form{
	constructor(ctx, x, y ,h ,w){
		super(ctx, x, y ,h ,w);
		this.setSpeed();
	}

	setSpeed(){
		this.speed = randint(-2, 4);
		if (this.speed == 0) {this.speed = 1;}
		this.dx = 3*this.speed;
		this.dy = 3*this.speed;
	}

	resetSpeed(){
		this.speed = randint(-2, 4);
		if (this.speed == 0) {this.speed = 1;}
		this.dx = this.dx*this.speed;
		this.dy = this.dy*this.speed;
	}

	checkBorder(){
		if(this.x + this.dx + this.width > 800 || this.x + this.dx < 0) {
			this.dx = -this.dx;
			this.color.reset();
		}
		if(this.y + this.dy + this.height > 700 || this.y + this.dy < 0) {
			this.dy = -this.dy;
			this.color.reset();
		}
	}

	move(){
		this.x += this.dx;
		this.y += this.dy;
	}

	draw(){}
}

class Circle extends Moving{
	constructor(ctx, x, y ,h ,w){
		super(ctx, x, y ,h ,w);
	}

	draw(){
		this.ctx.beginPath();
		this.ctx.arc(this.x, this.y, this.width, 0, Math.PI*2);
		this.color.fill(this.ctx);
		this.ctx.closePath();
		this.move()
	}
}

class Triangle extends Moving{
	constructor(ctx){
		var h = randint(40, 80);
		var x = randint(0 , 800-h);
		var y = randint(0 , 700-h);
		super(ctx, x, y ,h ,h);
		this.height = this.width = randint(40,80);
		this.dx = this.dy = 0;
	}

	draw(){
		this.ctx.beginPath();
		this.ctx.moveTo(this.x, this.y);
		this.ctx.lineTo(this.x + this.width, this.y);
		this.ctx.lineTo(this.x, this.y + this.width);
		this.color.fill(this.ctx);
		this.ctx.fill();
		this.checkBorder();
		this.move();
	}
}

class Pong{
	constructor(){
		this.canvas = document.getElementById("boardgame");
		this.ctx = this.canvas.getContext("2d");

		this.balls = new Array();
		this.walls = new Array();
		this.triangle = new Triangle(this.ctx);
		this.countB = 0;
		this.countW = 0;
	}

	motion(events){
		var touche = events.keyCode;
		if (touche == 37) {
			events.preventDefault();
			this.triangle.dx = -1;
			this.triangle.dy = 0;
		} else if  (touche == 38) {
			events.preventDefault();
			this.triangle.dy = -1;
			this.triangle.dx = 0;
		}
		else if  (touche == 39) {
			events.preventDefault();
			this.triangle.dx = 1;
			this.triangle.dy = 0;
		}else if  (touche == 40) {
			events.preventDefault();
			this.triangle.dx = 0;
			this.triangle.dy = 1;
		}else if (touche == 32) {
			events.preventDefault();
			this.triangle.dx = 0;
			this.triangle.dy = 0;
		}
	}

	reset(){
		this.balls = new Array();
		this.walls = new Array();
		this.triangle = new Triangle(this.ctx);
		this.countB = 0;
		this.countW = 0;
	}

	addBall(){
		var x =parseInt( document.getElementById("x-b").value);
		if ((x >= 10) && (x <= 700)) {
			var y =parseInt( document.getElementById("y-b").value);
			if (y >= 10 && y <= 600) {
				var h =parseInt( document.getElementById("h-b").value);
				if (h >= 5 && h <= 10) {
					if (this.countB <= 5) {
						this.balls.push(new Circle(this.ctx, x, y ,h ,h));
						this.countB +=1;
					}
				}		
			}	
		}
	}

	addWall(){
		var x =parseInt( document.getElementById("x-w").value);
		if (x >= 10 && x <= 700) {
			var y =parseInt( document.getElementById("y-w").value);
			if (y >= 10 && y <= 600) {
				var h =parseInt( document.getElementById("h-w").value);
				if (h >= 50 && h <= 100) {
					var w =parseInt( document.getElementById("w-w").value);
					if (w >= 50 && w <= 100) {
						if (this.countW <= 3) {
							this.balls.push(new Wall(this.ctx, x, y ,h ,w));
							this.countW +=1;
						}
					}
				}		
			}	
		}
	}

	execute(){
		this.clear();
		this.collision(this.triangle);
		for (var i = 0; i < this.walls.length; i++) {
			this.walls[i].draw();
		}
		for (var i = 0; i < this.balls.length; i++) {
			this.collision(this.balls[i]);
		}
	}

	collision(e){
		e.checkBorder();
		if (!(e instanceof Triangle)) {
			e.collision(this.triangle);
		}
		this.balls.forEach(function(b){
			if (e != b) {e.collision(b);}
		});
		this.walls.forEach(function(b){
			if (e != b) {e.collision(b);}
		});
		e.draw();
	}

	clear(){
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
}

var game = new Pong();

window.setInterval(function(){
	game.execute();
}, 10);
