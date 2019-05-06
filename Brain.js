class Brain{
    constructor(size){
        this.directions = new Array(size);
        this.step = 0;
        this.randomize();
    }

    randomize(){
        for(var i = 0; i < this.directions.length; i++){
            var randomAngle = getRandom(2*Math.PI);
            //randomAngle = Math.ceil(randomAngle * 1000) / 1000
            this.directions[i] = new PVector().fromAngle(randomAngle.toFixed(2));
        }
    }

    clone(){
        var clone = new Brain(this.directions.length);
        for(var i = 0; i < this.directions.length; i++){
            clone.directions[i] = this.directions[i].copy();
        }
        return clone;
    }

    mutate(){
        var mutationRate = 0.01;
        for(var i = 0; i < this.directions.length; i++){
            var rand = getRandom(1);
            if(rand < mutationRate){
                var randomAngle = getRandom(2 * Math.PI);
                this.directions[i] = new PVector().fromAngle(randomAngle);
            }
        }
    }

    thinkAnotherWay(firstStep){
        for(var i = firstStep + 1; i < this.directions.length; i++){
            var randomAngle = getRandom(2*Math.PI);
            //randomAngle = Math.ceil(randomAngle * 1000) / 1000
            this.directions[i] = new PVector().fromAngle(randomAngle.toFixed(2));
        }
    }
}