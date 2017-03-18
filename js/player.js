function Player(x, y, speed, color, w, h)
{
	ObjectFather.call(this, x, y, speed);

	this.color = color;
	this.w = w;
	this.h = h;
}


Player.prototype.draw = function()
	{
		
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.rect(this.location.x, this.location.y-this.h/2, this.w, this.h);
		ctx.closePath();
		ctx.fill();
		ctx.stroke();

	}

Player.prototype.update = function()
	{
		this.velocity.add(this.acceleration);
		this.velocity.mult(resistance);
		this.location.add(this.velocity);
	}

Player.prototype.collision = function()
	{
		

	}




