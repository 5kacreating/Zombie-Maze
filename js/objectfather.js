function ObjectFather(x, y, speed, color, w, h)
{
	this.position = new Vector(x,y);
	this.speed = speed;
	this.velocity = new Vector(0,0);
	this.acceleration = new Vector(0,0);
	this.direction = new Vector(0,0);
	this.color = color;
	this.w = w;
	this.h = h;


	this.getRoomCoordinates = function()
		{
			var roomPos = new Vector (Math.floor(this.position.x / roomWidth), 
								  Math.floor(this.position.y / roomHeight));
			return roomPos;
		}

	
		
}
