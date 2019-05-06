class PVector{
    constructor (x, y){
        this.x = x;
        this.y = y;
        this._limit = Infinity;
    }

    add(vector){
        this.x += vector.x;
        this.y += vector.y;
    }

    limit(limit){
        this._limit = limit;

        this.x = this.x;

        this.y = this.y;
    }

    fromAngle(angle){
        var x = Math.cos(angle);
        var y = Math.sin(angle);
        return new PVector(x, y);
    }

    copy(){
        var copy = new PVector(this.x, this.y);
        copy.limit = this.limit;
        return copy;
    }

    get x() {
      return this._x;
    }
  
    set x(value) {
        this._x = value > this._limit ? this._limit : value;

        this._x = this._x < this._limit * -1 ? this._limit * -1 : this._x;
    }

    get y() {
      return this._y;
    }
  
    set y(value) {
      this._y = value > this._limit ? this._limit : value;

      this._y = this._y < this._limit * -1 ? this._limit * -1 : this._y;
    }
}