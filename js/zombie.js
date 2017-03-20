function Zombie(x, y, speed, color, w, h, room, path)
{
	ObjectFather.call(this, x, y, speed, color, w, h, room);

	this.path = path;
}




Zombie.prototype.draw = function(ctx)
	{
		ctx.beginPath();
		ctx.fillStyle = this.color;
		ctx.strokeStyle = this.color;
		ctx.rect(this.position.x - this.w / 2 + mazeX,
				 this.position.y - this.h / 2 + mazeY,
				 this.w,
				 this.h);
		ctx.stroke();
		ctx.fill();
	

	}

Zombie.prototype.update = function()
	{
		this.targetPositionChanged();
		if (this.path.length > 0)
		{
			this.targetRoomReached();
		}
		
		this.getTargetDirection();
		this.direction.mult(this.speed);
		this.acceleration.add(this.direction);
		this.velocity.add(this.acceleration);
		this.velocity.mult(resistance);
		this.position.add(this.velocity);

		this.direction.normal();
		this.acceleration.mult(0);
	}

Zombie.prototype.collision = function()
	{
		

	}



Zombie.prototype.getTargetDirection = function()
	{
		var targetX,
			targetY;
		if (this.path.length <= 1)
		{
			targetX = player.position.x;
			targetY = player.position.y;
		}
		else
		{
			targetX = this.path[0].x * roomWidth + roomWidth * 0.5;
			targetY = this.path[0].y * roomHeight + roomHeight * 0.5;
		}

		this.direction.x = targetX - this.position.x;
		this.direction.y = targetY - this.position.y;
		this.direction.normal();

	}

Zombie.prototype.targetRoomReached = function()
	{
		var roomCoordinates = this.getRoomCoordinates();
		if (this.path[0].x == roomCoordinates.x && this.path[0].y == roomCoordinates.y && this.path.length != 1)
		{
			this.path.shift();
		}
	}

Zombie.prototype.targetPositionChanged = function()
	{
		var targetPosition = player.getRoomCoordinates();

		if (targetPosition.x != this.path[this.path.length - 1].x || 
			targetPosition.y != this.path[this.path.length - 1].y)
		{
			if (this.path.length > 1)
			{
				if (this.path[this.path.length - 2].x == targetPosition.x &&
					this.path[this.path.length - 2].y == targetPosition.y)
				{
					this.path.pop();
				}
				else
				{
					this.path.push({x: targetPosition.x, y: targetPosition.y});
				}
			}
			else
			{
				this.path.push({x: targetPosition.x, y: targetPosition.y});
			}
		}
	}