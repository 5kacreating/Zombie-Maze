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
	this.colors = [
		["rgb(10,0,0)", "rgb(70,20,0)", "rgb(60,0,0)","rgb(50,0,0)", "rgb(40,0,0)"],
		["rgb(40,0,0)", "rgb(30,10,0)", "rgb(80,0,0)","rgb(70,0,0)", "rgb(60,0,0)"],
		["rgb(10,0,0)", "rgb(30,0,0)", "rgb(20,0,0)", "rgb(10,0,0)", "rgb(30,0,0)"]
	];
	this.colors2 = [
		["rgb(10,0,0)", "rgb(70,20,0)", "rgb(60,0,0)"],
		["rgb(30,0,0)", "rgb(20,10,0)", "rgb(40,0,0)"],
		["rgb(40,0,0)", "rgb(50,0,0)", "rgb(100,0,0)"],
		["rgb(60,0,0)", "rgb(20,20,0)", "rgb(30,0,0)"],
		["rgb(80,0,0)", "rgb(10,10,0)", "rgb(20,0,0)"]
	
	];

}

Room.prototype.drawWalls = function(ctx, wallWidth, wallHeight)
{
	var t;
	var q;
	if (this.walls.up)
	{			
	
		t = this.width / 5;
		q = wallHeight / 3;
		for (var i = 0; i<3; i++)
		{
			for (var j = 0; j<5; j++)
			{
				ctx.beginPath();
				ctx.fillStyle = this.colors[i][j];
				ctx.rect(this.position.x * this.width + t*j + mazeX, 
				 this.position.y * this.height + i*q + mazeY,
				 t, 
				 q);

				ctx.fill();
				
				
			}
		}
	
	
		
	}
	if (this.walls.left)
	{	
		t = wallHeight / 3;
		q = this.width / 5 ;
		for (var i = 0; i<5; i++)
		{
			for (var j = 0; j<3; j++)
			{
				ctx.beginPath();
				ctx.fillStyle = this.colors2[i][j];
				ctx.rect(this.position.x * this.width + t*j + mazeX, 
				 this.position.y * this.height + i*q + mazeY,
				 t, 
				 q);

				ctx.fill();
				
				
			}
		}
	}
	
}	

Room.prototype.drawDownWalls = function(ctx, wallWidth, wallHeight, color)
{
	if (this.walls.down)
	{	
		ctx.beginPath();
		ctx.fillStyle = this.color;
		ctx.strokeStyle = this.color;
		ctx.rect(this.position.x * this.width + mazeX,
				 this.position.y * this.height + this.height + mazeY,
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
		ctx.fillStyle = this.color;
		ctx.strokeStyle = this.color;
		ctx.rect(this.position.x * this.width + this.width + mazeX, this.position.y * this.height + mazeY, wallHeight, wallWidth);
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
			this.rooms[i][j].drawWalls(ctx, this.wallWidth, this.wallHeight);
		}
	}

	for (var i = 0; i < this.width; i++)
	{
		this.rooms[i][this.height-1].drawDownWalls(ctx, this.wallWidth, this.wallHeight);
	}
	for (var i = 0; i < this.height; i++)
	{
		this.rooms[this.width-1][i].drawRightWalls(ctx, this.wallWidth, this.wallHeight);
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