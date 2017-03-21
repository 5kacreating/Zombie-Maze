function Player(x, y, speed, color, w, h)
{
	ObjectFather.call(this, x, y, speed, color, w, h);
}



Player.prototype.update = function()
	{
		var vec = new Vector (cWidth / 2, cHeight / 2);

		if(vec.distance(mousePosition) > this.w / 2)
		{
		this.getDriection();
		this.direction.mult(this.speed);
		this.acceleration.add(this.direction);
		this.collision();
		this.velocity.add(this.acceleration);
		this.velocity.mult(resistance);
		this.position.add(this.velocity);
		this.acceleration.mult(0);
		}
	}

Player.prototype.collision = function()
	{
		var roomPos = this.getRoomCoordinates();
		var	room = maze.rooms[roomPos.x][roomPos.y];
		var	rlPos = new Vector(roomPos.x * roomWidth, roomPos.y * roomHeight);
		if(room.walls.up)
		{
			if (rlPos.y + wallHeight >= this.position.y - this.h / 2)
			{

				this.acceleration.y *= -1;
				this.velocity.y *= -1;
				this.position.y +=5;
			}
		}
		if(room.walls.right)
		{
			if (rlPos.x + roomWidth <= this.position.x + this.w / 2)
			{
				this.acceleration.x *= -1;
				this.velocity.x *= -1;
				this.position.x -=5;
			}
		}
		if(room.walls.down)
		{
			if (rlPos.y + roomHeight <= this.position.y + this.h / 2)
			{
				this.acceleration.y *= -1;
				this.velocity.y *= -1;
				this.position.y -=5;
			}
		}
		if(room.walls.left)
		{
			if (rlPos.x + wallHeight >= this.position.x + this.w / 2)
			{
				this.acceleration.x *= -1;
				this.velocity.x *= -1;
				this.position.x +=5;
			}
		}


		
	}

Player.prototype.getDriection = function()
	{
		this.direction.x = mousePosition.x - cWidth / 2;
		this.direction.y = mousePosition.y - cHeight / 2;
		this.direction.normal();

	}

Player.prototype.draw = function(ctx)
	{
		ctx.beginPath();
		ctx.fillStyle = this.color;
		ctx.strokeStyle = this.color;
		ctx.rect(cWidth/2 - this.w / 2,
				 cHeight/2 - this.h / 2,
				 this.w,
				 this.h);
		ctx.stroke();
		ctx.fill();
	

	}




