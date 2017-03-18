function Room(x,y, width, height, mazePosition)
{
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.mazePosition = new Vector(mazePosition.x, mazePosition.y);

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

}

Room.prototype.addUnvisitedNeighbor = function(neighbor)
{
	this.unvisitedNeighbors.push(neighbor);
}

Room.prototype.drawWalls = function(ctx, wallWidth, wallHeight, color)
{
	if (this.walls.up)
	{	
		ctx.beginPath();
		ctx.fillStyle = color;
		ctx.strokeStyle = color;
		ctx.rect(this.x * this.width + this.mazePosition.x, 
				 this.y * this.height + this.mazePosition.y,
				 wallWidth, 
				 wallHeight);
		ctx.stroke();
		ctx.fill();
	}
	if (this.walls.left)
	{	
		ctx.beginPath();
		ctx.fillStyle = color;
		ctx.strokeStyle = color;
		ctx.rect(this.x * this.width + this.mazePosition.x,
		 		 this.y * this.height + this.mazePosition.y,
		 		 wallHeight,
		 		 wallWidth);
		ctx.stroke();
		ctx.fill();
	}
	
}	

Room.prototype.drawDownWalls = function(ctx, wallWidth, wallHeight, color)
{
	if (this.walls.down)
	{	
		ctx.beginPath();
		ctx.fillStyle = color;
		ctx.strokeStyle = color;
		ctx.rect(this.x * this.width + this.mazePosition.x,
				 this.y * this.height + this.height + this.mazePosition.y,
				 wallWidth,
				 wallHeight);
		ctx.stroke();
		ctx.fill();
	}
}

Room.prototype.drawRightWalls = function(ctx, wallWidth, wallHeight, color)
{
	if (this.walls.right)
	{	
		ctx.beginPath();
		ctx.fillStyle = color;
		ctx.strokeStyle = color;
		ctx.rect(this.x * this.width + this.width, this.y * this.height, wallHeight, wallWidth);
		ctx.stroke();
		ctx.fill();
	}
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

	/*
	An array containing all the rooms in our maze.
	*/
	
	this.rooms = [];
	
		for (var i = 0; i < this.width; i++)
	{
		this.rooms[i] = [];
	}

	for (var i = 0; i < this.width; i++)
	{
		for (var j = 0; j < this.height; j++)
		{
			this.rooms[i][j] = new Room(i,j, this.roomWidth, this.roomHeight, this.position); 
		}
	}

	this.roomsVisited = 0;
	this.roomsNumber = this.width * this.height;
	this.stack = [];
	this.currentRoom;

}

Maze.prototype.addNeighbors = function(room)
{
		room.unvisitedNeighbors = [];

		if (room.x > 0)
		{
			if (!this.rooms[room.x - 1][room.y].visited)
			{
				room.addUnvisitedNeighbor(this.rooms[room.x - 1][room.y]);
			}
		}

		if (room.x < this.width - 1)
		{
			if (!this.rooms[room.x + 1][room.y].visited)
			{
				room.addUnvisitedNeighbor(this.rooms[room.x + 1][room.y]);
			}
		}

		if (room.y > 0)
		{
			if (!this.rooms[room.x][room.y - 1].visited)
			{
				room.addUnvisitedNeighbor(this.rooms[room.x][room.y - 1]);
			}
		}

		if (room.y < this.height - 1)
		{
			if (!this.rooms[room.x][room.y + 1].visited)
			{
				room.addUnvisitedNeighbor(this.rooms[room.x][room.y + 1]);
			}
		}
}

Maze.prototype.removeWalls = function(firstRoom, secondRoom)
{
	if (firstRoom.x < secondRoom.x)
	{
		firstRoom.walls.right = false;
		secondRoom.walls.left = false;
	}
	else if (firstRoom.x > secondRoom.x)
	{
		firstRoom.walls.left = false;
		secondRoom.walls.right = false;
	}
	else if (firstRoom.y < secondRoom.y)
	{
		firstRoom.walls.down = false;
		secondRoom.walls.up = false;
	}
	else if (firstRoom.y > secondRoom.y)
	{
		firstRoom.walls.up = false;
		secondRoom.walls.down = false;
	}
}

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
			this.rooms[i][j].drawWalls(ctx, this.wallWidth, this.wallHeight, this.color);
		}
	}

	for (var i = 0; i < this.width; i++)
	{
		this.rooms[i][this.height-1].drawDownWalls(ctx, this.wallWidth, this.wallHeight, this.color);
	}
	for (var i = 0; i < this.height; i++)
	{
		this.rooms[this.width-1][i].drawRightWalls(ctx, this.wallWidth, this.wallHeight, this.color);
	}
}