var population = new Population(250);
var goal = new PVector(400, 10);

var velocity = 1e3 / 240;

var obstacle1 = new Obstacle(new PVector(612.5, 300), 375, 10);
var obstacle2 = new Obstacle(new PVector(640, 500), 350, 10);
var obstacle3 = new Obstacle(new PVector(160, 500), 350, 10);

var obstacles = [obstacle1, obstacle2, obstacle3, new Obstacle(new PVector(187.5, 300), 375, 10), new Obstacle(new PVector(400, 300), 10, 400),
    new Obstacle(new PVector(370, 200), 10, 200),
    new Obstacle(new PVector(430, 200), 10, 200),
    new Obstacle(new PVector(330, 400), 10, 200),
    new Obstacle(new PVector(470, 400), 10, 200),
    new Obstacle(new PVector(400, 340), 80, 10),
    new Obstacle(new PVector(350, 380), 50, 10),
    new Obstacle(new PVector(450, 380), 50, 10),
    new Obstacle(new PVector(400, 420), 80, 10),
    new Obstacle(new PVector(350, 460), 50, 10),
    new Obstacle(new PVector(450, 460), 50, 10)];//, new Obstacle(new PVector(400, 325), 200, 10)];//, new Obstacle(new PVector(400, 700), 200, 10), new Obstacle(new PVector(300, 350), 10, 100)];

var timeStart = 0, timeEnd = 0, timeLastGen = 0, firstGen = -1;

function setup(){

    drawObstaclesOnScreen(obstacles);

    draw();
}

function draw(){    
    drawOnScreen(goal.x, goal.y, "goal");

    if(population.allDotsDead()){
        population.calculateFitness();
        population.naturalSelection();
        population.mutateDemBabies();
    }
    else{
        population.update();
        population.show();
    }

    setTimeout(() => {
        draw();
    }, velocity);
}

function increaseVel(){
    velocity -= (1000 / 60);
}

function decreaseVel(){
    velocity += (1000 / 60);
}

$("#chkBest").on("change", () => {
    population.showOnlyBest = $("#chkBest:checked").length > 0;
    $('.dot:not(.best)').remove();
});