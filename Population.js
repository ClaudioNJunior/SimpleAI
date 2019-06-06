class Population{
    constructor(size){
        this.dots = new Array(size);
        this.fitnessSum = 0;
        this._gen = 1;
        this.bestDot = 0;
        this.minStep = 400;
        this.showOnlyBest = false;

        for(var i = 0; i < size; i++){
            this.dots[i] = new Dot();
        }
    }

    get gen(){
        return this._gen;
    }

    set gen(value){
        $("#gen").text(value);
        this._gen = value;
    }

    show(){
        for(var i = 0; i < this.dots.length; i++){
            if(this.showOnlyBest){
                if(this.dots[i].isBest){
                    this.dots[i].show();
                }
            }
            else{
                this.dots[i].show();
            }
        }
    }

    update(){
        for(var i = 0; i < this.dots.length; i++){
            if(this.dots[i].brain.step == 0){
                timeStart = performance.now();
            }

            if(this.dots[i].brain.step > this.minStep){
                this.dots[i].dead = true;
            }
            else{
                this.dots[i].update();
            }
        }
    }

    calculateFitness(){
        for(var i = 0; i < this.dots.length; i++){
            this.dots[i].calculateFitness();
        }
    }

    allDotsDead(){
        for(var i = 0; i < this.dots.length; i++){
            if(!this.dots[i].dead && !this.dots[i].reachedGoal){
                return false;
            }
        }
        return true;
    }

    naturalSelection(){
        var newDots = new Array(this.dots.length);

        this.setBestDot();
        this.calculateFitnessSum();

        newDots[0] = this.dots[this.bestDot].gimmeBaby();
        newDots[0].isBest = true;

        for(var i = 1; i < newDots.length; i++){
            var parent = this.selectParent();

            newDots[i] = parent.gimmeBaby();
        }

        eraseFromScreen(this.dots);

        if(firstGen == -1){
            if(this.someoneReachedGoal()){
                firstGen = this.gen;

                $("#objectiveGen").text(firstGen);
                $("#objectiveSteps").text(this.minStep);
            }       
        }

        $("#time").text(timeLastGen);
        $("#steps").text(this.minStep);
        var totalDeaths = this.howManyDead();
        var totalDeathsByWall = this.howManyDeadByWall();
        $("#deadByWall").text(totalDeathsByWall);
        $("#deadByEnergy").text(totalDeaths - totalDeathsByWall);

        this.dots = newDots.slice(0);

        timeEnd = performance.now();

        timeLastGen = (timeEnd - timeStart) / 1000;

        this.gen++;
    }

    calculateFitnessSum(){
        this.fitnessSum = 0;
        for(var i = 0; i < this.dots.length; i++){
            this.fitnessSum += this.dots[i].fitness;
        }
    }

    selectParent(){
        var rand = getRandom(this.fitnessSum);
        var runningSum = 0;
        for(var i = 0; i < this.dots.length; i++){
            runningSum += this.dots[i].fitness;
            
            if (runningSum > rand){
                return this.dots[i];
            }
        }

        //Should never get here

        return null;
    }

    mutateDemBabies(){
        for(var i = 1; i < this.dots.length; i++){
            this.dots[i].brain.mutate();
        }
    }

    setBestDot(){
        var max = 0, maxIndex = 0;
        
        for(var i = 0; i < this.dots.length; i++){
            if(this.dots[i].fitness > max){
                max = this.dots[i].fitness;
                maxIndex = i;
            }
        }

        this.bestDot = maxIndex;

        if(this.dots[this.bestDot].reachedGoal){
            this.minStep = this.dots[this.bestDot].brain.step;
        }
        else{
            this.dots[this.bestDot].brain.thinkAnotherWay(this.dots[this.bestDot].brain.step);
        }
    }

    someoneReachedGoal(){
        for(var i = 0; i < this.dots.length; i++){
            if(this.dots[i].reachedGoal){
                return true;   
            }
        }
        return false;
    }

    howManyDead(){
        var amount = 0;
        for(var i = 0; i < this.dots.length; i++){
            if(this.dots[i].dead){
                amount++;
            }
        }
        return amount;
    }

    howManyDeadByWall(){
        var amount = 0;
        for(var i = 0; i < this.dots.length; i++){
            if(this.dots[i].deadByWall){
                amount++;
            }
        }
        return amount;
    }
}