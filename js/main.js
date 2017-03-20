var resistance  = 0.8,
	canvas,
	ctx,
	cWidth = 620,
	cHeight = 620,
	player,
	maze,
	mazeX = 0,
	mazeY = 0,
	mazeWidth = 12,
	mazeHeight = 12,
	roomWidth = 50,
	roomHeight = 50,
	wallWidth = 50,
	wallHeight = 15,
	playerStartX = 0,
	playerStartY = 0,
	zombies = [],
	zombiesNumber = Math.floor(Math.random() * 10) + 3,
	playerSpeed = 0.15,
	zombieSpeed = 0.1,
	mousePosition = new Vector(0,0);


/*
Our setup function when our JavaScript application is loaded.
*/

window.onload = function()
{
	 
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext('2d');
	canvas.width  = cWidth;
	canvas.height = cHeight;
	player = new Player (playerStartX * roomWidth + roomWidth/2, playerStartY * roomHeight + roomHeight/2, playerSpeed, "green", 10, 10);
	newMaze();
	createZombies();


/*
Calling update function refreshing our Canvas every ms.
*/
	setInterval(function(){update()}, 1);
}

function newMaze()
{
	maze = new Maze(mazeX,mazeY,mazeWidth, mazeHeight,
					roomWidth, roomHeight, wallWidth,
					wallHeight,playerStartX,playerStartY,
					"rgb(120,0,0)");
}

function createZombies()
{
	var position,
		room,
		path;

	for (var i = 0; i<zombiesNumber; i++)
	{
		room = maze.getRandomRoom();
		position = new Vector(room.position.x * roomWidth + roomWidth / 2, room.position.y * roomHeight + roomHeight / 2);
		path = maze.findYourPath(room);
		zombies[i]= new Zombie(position.x, position.y, zombieSpeed, "black", 10, 10, room, path);
	}
}


function update()
{		
	ctx.clearRect(0,0,canvas.width,canvas.height);
	maze.draw(ctx);
	for (var z in zombies)
	{
		zombies[z].update();
		zombies[z].draw(ctx);
	}
	player.update();
	player.draw(ctx);
}

/*
An array containing information which keys are down at the moment.
*/

var keyMap = [];

/*
If you press a key the 'keyDown' function will be called.
*/
document.onkeydown = keyDown;

/*
If you release a key the 'upKey' function will be called.
*/
document.onkeyup = upKey;

function keyDown(e)
{	
	keyMap[e.keyCode] = true;
}

function upKey(e)
{
	keyMap[e.keyCode] = false;
}



function move()
{

if (keyMap[38])
	{
		
	

  	}
  	
	else if (keyMap[40])
	{
	
		
  	}

  	else
  	{
  		
  	}

  	

}

document.onmousemove = mouseMove;

function mouseMove(e)
{
	mousePosition.x = e.pageX + mazeX;
	mousePosition.y = e.pageY + mazeY;
}