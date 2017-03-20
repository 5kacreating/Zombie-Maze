function Vector(x,y)
{
	this.x = x;
	this.y = y;
}	


Vector.prototype.normal = function ()
	{
		var l = this.length();
		this.x /= l;
		this.y /= l;
	}


Vector.prototype.add = function(v)
	{	
		this.x += v.x;
		this.y += v.y;
	}

Vector.prototype.mult = function(k)
	{
		this.x *= k;
		this.y *= k;
	}

Vector.prototype.sub = function(v)
	{
		var x = this.x - v.x,
			y = this.y - v.y;
		var vec = new Vector(x,y);

		return vec;
	}

Vector.prototype.length = function()
	{
		return (Math.sqrt(this.x*this.x + this.y*this.y));
	}

Vector.prototype.distance = function(v)
{
	return (Math.sqrt(
		(v.x - this.x) * (v.x - this.x)
		+ (v.y - this.y) * (v.y - this.y)
		));
}	
