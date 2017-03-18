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

Vector.prototype.length = function()
	{
		return (Math.sqrt(this.x*this.x + this.y*this.y));
	}