class Dot{
    constructor(){
        this.brain = new Brain(400);

        this.pos = new PVector(width() / 2, height() - 10);
        this.vel = new PVector(0, 0);
        this.acc = new PVector(0, 0);
        this.id = getUniqueID('dot-');

        this.dead = false;
        this.deadByWall = false;
        this.reachedGoal = false;
        this.isBest = false;

        this.fitness = 0;
    }

    show(){
        drawOnScreen(this.pos.x, this.pos.y, this.id, this.isBest);
    }
    
    move(){
        if(this.brain.directions.length > this.brain.step)
        {
            this.acc = this.brain.directions[this.brain.step];
            this.brain.step++;
        }
        else{
            this.dead = true;
        }
        this.vel.add(this.acc);
        this.vel.limit(5);
        this.pos.add(this.vel);
    }

    update(){
        if(this.dead || this.reachedGoal){return}

        this.move();
         

        if(this.pos.x < 2 || this.pos.y < 2 || this.pos.x > width() - 4 || this.pos.y > height() - 4){
            this.dead = true;
            this.deadByWall = true;
        }
        else if(dist(this.pos.x, this.pos.y, goal.x, goal.y) < 6){
            this.reachedGoal = true;
        }
        else if(this.hitBoundary()){
            this.dead = true;
            this.deadByWall = true;
        }
    }

    calculateFitness(){
        if(this.reachedGoal){
            this.fitness = 1 / 16 + 100000 / (this.brain.step * this.brain.step);
        }
        else{
            var distanceToGoal = dist(this.pos.x, this.pos.y, goal.x, goal.y);
            this.fitness = 1 / Math.pow(distanceToGoal, 2);
            if (!this.deadByWall){
                this.fitness = this.fitness * 1.2;
            }
        }
    }

    gimmeBaby(){
        var baby = new Dot();

        baby.brain = this.brain.clone();
        return baby;
    }

    hitBoundary(){
        var hit = false;

        for(var i = 0; i < obstacles.length; i++){
            //console.log(this.pos.x, this.pos.y) 
            if(this.pos.x < obstacles[i].boundaryRight && this.pos.x > obstacles[i].boundaryLeft - 4 && this.pos.y < obstacles[i].boundaryTop && this.pos.y > obstacles[i].boundaryBottom - 4){
                return true;
            }
        }
        return false;
    }
}