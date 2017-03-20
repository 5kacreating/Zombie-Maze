function ObjectFather(x, y, speed, color, w, h, room)
{
	this.position = new Vector(x,y);
	this.speed = speed;
	this.velocity = new Vector(0,0);
	this.acceleration = new Vector(0,0);
	this.direction = new Vector(0,0);
	this.color = color;
	this.w = w;
	this.h = h;
	this.room = room;
	
}


