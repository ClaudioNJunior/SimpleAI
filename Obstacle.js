class Obstacle{
    constructor(pos, width, height){
        this.pos = pos;
        this.width = width;
        this.height = height;
    }

    get boundaryTop(){
        return this.pos.y + this.height / 2;
    }

    get boundaryLeft(){
        return this.pos.x - this.width / 2;
    }

    get boundaryBottom(){
        return this.pos.y - this.height / 2;
        
    }

    get boundaryRight(){
        return this.pos.x + this.width / 2;
    }
}