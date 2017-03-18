var resistance  = 0.8;
var canvas;
var ctx;
var cWidth = 600;
var cHeight = 600;
var player;
var maze;


/*
Our setup function when our JavaScript application is loaded.
*/

window.onload = function()
{
	
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext('2d');
	canvas.width  = cWidth;
	canvas.height = cHeight;
	player = new Player(1,1,1, "", 1,1);
	newMaze();
	maze.draw(ctx);


/*
Calling update function refreshing our Canvas every ms.
*/
	//setInterval(function(){update()}, 1);
}

function newMaze()
{
	maze = new Maze(0,0,15, 15, 40, 40, 40,2,0,0,"rgb(120,0,0)");
	maze.generate();
}


function update()
{		
	ctx.clearRect(0,0,canvas.width,canvas.height);
	
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