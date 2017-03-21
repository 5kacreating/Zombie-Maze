function Room(x,y, width, height, color)
{
	this.position = new Vector(x,y);
	this.width = width;
	this.height = height;
	
	this.color = color;

	/*
	Object informing if walls exist in that room. All true at the beginning.
	*/
	this.walls = { 
		up: true,
		right: true,
		down: true,
		left: true
	};
	
	/*
	When generating maze we would like to know if we have already been in that room.
	*/
	this.visited = false;
	this.unvisitedNeighbors = [];
	this.img;


}
Room.prototype.drawWalls = function(ctx)
{
	var width = this.position.x * this.width + mazeX,
		height = this.position.y * this.height + mazeY;

	if (width < cWidth && height < cHeight && width + this.width >= 0 && height + this.height >= 0)
	{
		if (!this.img)
		{
			this. img = new Image,
			pos = this.position;
		
		this.img.onload = function()
			{
		ctx.drawImage(this, width, height, roomWidth + 1, roomHeight + 1);
			}
		this.img.src = this.getWallsUrl();
		}
		else
		{

			ctx.drawImage(this.img, Math.floor(width), Math.floor(height), roomWidth, roomHeight);
		}

	}

}


Room.prototype.getWallsUrl = function()
{
	
	
	if(!this.walls.up)
	{
		if(!this.walls.right)
		{
			if(!this.walls.down)
			{
				if (!this.walls.left)
				{
					return "img/all.png";
				}
			
			return "img/toprightdown.png";
		
			
			}
			else if(!this.walls.left)
			{
				return "img/toprightleft.png";
			}
		
		return "img/topright.png";
				
		}
		else if(!this.walls.left)
		{
			if(!this.walls.down)
			{
				return "img/topleftdown.png";
			}

			return "img/topleft.png";
					
		}
		else if(!this.walls.down)
		{
			return "img/topdown.png";
				
		}
		
		return "img/top.png";
	
	}
	else if (!this.walls.right)
	{
		if(!this.walls.down)
		{
			if(!this.walls.left)
			{
				return "img/rightdownleft.png";
				
			}
		
		return "img/rightdown.png";
	
		}
		else if(!this.walls.left)
		{
			return "img/leftright.png";
		}

		return "img/right.png";
		
	}
	else if (!this.walls.down)
	{
		if (!this.walls.left)
		{
			return "img/downleft.png";
			
		}
		return "img/down.png";
	
	}
	else if (!this.walls.left)
	{
		return "img/left.png";
		
	}
	
	return "";
}	



function Maze(x,y,width, height, roomHeight, roomWidth, wallWidth, wallHeight, startX, startY, color)
{
	this.position = new Vector(x,y);
	this.width = width;
	this.height = height;
	this.roomHeight = roomHeight;
	this.roomWidth = roomWidth;
	this.wallHeight = wallHeight;
	this.wallWidth = wallWidth;
	this.startX = startX;
	this.startY = startY;
	this.color = color;
	this.paths = [];

	/*
	An array containing all the rooms in our maze.
	*/
	
	this.rooms = [];
	
		for (var i = 0; i < this.width; i++)
	{
		this.rooms[i] = [];
		this.paths[i] = [];
	}

	for (var i = 0; i < this.width; i++)
	{
		for (var j = 0; j < this.height; j++)
		{
			this.rooms[i][j] = new Room(i,j, this.roomWidth, this.roomHeight, this.color); 
		}
	}

	this.roomsVisited = 0;
	this.roomsNumber = this.width * this.height;
	this.stack = [];
	this.currentRoom;

	this.generate();

	
}

Maze.prototype.addNeighbors = function(room)
{
		room.unvisitedNeighbors = [];

		if (room.position.x > 0)
		{
			if (!this.rooms[room.position.x - 1][room.position.y].visited)
			{
				room.unvisitedNeighbors.push(this.rooms[room.position.x - 1][room.position.y]);
			}
		}

		if (room.position.x < this.width - 1)
		{
			if (!this.rooms[room.position.x + 1][room.position.y].visited)
			{
				room.unvisitedNeighbors.push(this.rooms[room.position.x + 1][room.position.y]);
			}
		}

		if (room.position.y > 0)
		{
			if (!this.rooms[room.position.x][room.position.y - 1].visited)
			{
				room.unvisitedNeighbors.push(this.rooms[room.position.x][room.position.y - 1]);
			}
		}

		if (room.position.y < this.height - 1)
		{
			if (!this.rooms[room.position.x][room.position.y + 1].visited)
			{
				room.unvisitedNeighbors.push(this.rooms[room.position.x][room.position.y + 1]);
			}
		}
}

Maze.prototype.removeWalls = function(firstRoom, secondRoom)
{
	if (firstRoom.position.x < secondRoom.position.x)
	{
		firstRoom.walls.right = false;
		secondRoom.walls.left = false;
	}
	else if (firstRoom.position.x > secondRoom.position.x)
	{
		firstRoom.walls.left = false;
		secondRoom.walls.right = false;
	}
	else if (firstRoom.position.y < secondRoom.position.y)
	{
		firstRoom.walls.down = false;
		secondRoom.walls.up = false;
	}
	else if (firstRoom.position.y > secondRoom.position.y)
	{
		firstRoom.walls.up = false;
		secondRoom.walls.down = false;
	}
}

/*
-> Recursive backtracker
https://en.wikipedia.org/wiki/Maze_generation_algorithm 
*/

Maze.prototype.generate = function() 
{
	this.currentRoom = this.rooms[this.startX][this.startY];
	this.currentRoom.visited = true;
	this.roomsVisited++;
	

	while (this.roomsVisited < this.roomsNumber)
	{
		this.addNeighbors(this.currentRoom);

		if (this.currentRoom.unvisitedNeighbors.length > 0)
		{
			var r = this.currentRoom.unvisitedNeighbors[Math.floor(Math.random() * this.currentRoom.unvisitedNeighbors.length)];
			this.stack.push(this.currentRoom);
			this.removeWalls(this.currentRoom, r);
			this.addPath(this.currentRoom, r);
			this.currentRoom = r;
			this.currentRoom.visited = true;
			this.roomsVisited++;
		
		}
		else if (this.stack.length > 0)
		{
			
			this.currentRoom = this.stack.pop();
		}
		
	}
}

Maze.prototype.draw = function(ctx)
{
	for (var i = 0; i < this.width; i++)
	{
		for (var j = 0; j < this.height; j++)
		{
			this.rooms[i][j].drawWalls(ctx);
		}
	}


}

Maze.prototype.addPath = function(fatherRoom, childRoom)
{
	this.paths[childRoom.position.x][childRoom.position.y] = {x: fatherRoom.position.x, y: fatherRoom.position.y};
}

Maze.prototype.findYourPath = function(yourRoom)
{
	var x = yourRoom.position.x;
	var y = yourRoom.position.y;
	var tmpX;
	var tmpY;
	var path = [];

	while(x+y != 0)
	{
		//this.rooms[x][y].color = "rgb(0,120,0)";
		path.push(this.paths[x][y]);
		tmpX = this.paths[x][y].x;
		tmpY = this.paths[x][y].y;
		x = tmpX;
		y = tmpY;
	}

	return path;
}

Maze.prototype.getRandomRoom = function()
{
	var x, y;

		do {
	 	x = Math.floor(Math.random() * this.width),
		y = Math.floor(Math.random() * this.height);
			}
		
		while(x+y<4);

	return this.rooms[x][y];
}