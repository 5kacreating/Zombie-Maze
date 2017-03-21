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

	this.clearYourRoom = function()
		{
			var p = this.getRoomCoordinates();
			ctx.clearRect(p.x * roomWidth, p.y * roomHeight, roomWidth, roomHeight);
			if(p.x > 0)
			{
				ctx.clearRect((p.x - 1) * roomWidth, p.y * roomHeight, roomWidth, roomHeight);
				maze.rooms[p.x - 1][p.y].drawWalls(ctx);
			}
			if(p.x < mazeWidth - 1)
			{
				ctx.clearRect((p.x + 1) * roomWidth, p.y * roomHeight, roomWidth, roomHeight);
				maze.rooms[p.x + 1][p.y].drawWalls(ctx);
			}
			if(p.y > 0)
			{
				ctx.clearRect(p.x * roomWidth, (p.y - 1) * roomHeight, roomWidth, roomHeight);
				maze.rooms[p.x][p.y - 1].drawWalls(ctx);
			}
			if(p.y < mazeHeight - 1)
			{
				ctx.clearRect(p.x * roomWidth, (p.y + 1) * roomHeight, roomWidth, roomHeight);
				maze.rooms[p.x][p.y + 1].drawWalls(ctx);
			}


			maze.rooms[p.x][p.y].drawWalls(ctx);
		}

	
		
}
