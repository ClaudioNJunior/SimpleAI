// function getRandom(min, max) {
//     return Math.random() * (max - min) + min;
// }

function getRandom(max) {
    return Math.random() * max;
}

function getUniqueID(prefix) {
    do {
        prefix += ~~(Math.random() * 1000000);
    } while (document.getElementById(prefix));
    return prefix;
}

function drawOnScreen(x, y, id, isBest){
    if($(`#${id}`).length == 0){
        $("#area").append(`<div class='dot ${isBest ? "best" : ""}' id='${id}'></div>`);
    }
	$(`#${id}`).css("left", x + "px");;
	$(`#${id}`).css("top", y + "px");;
}

function drawObstacleOnScreen(obstacle){
    $("#area").append(`<div class='obstacle' style='height: ${obstacle.height}px; width: ${obstacle.width}px; left: ${obstacle.pos.x}px; top: ${obstacle.pos.y}px;' id='${getUniqueID("obstacle-")}'></div>`);
}

function drawObstaclesOnScreen(obstacles){
    for(var i= 0; i < obstacles.length; i++){
        drawObstacleOnScreen(obstacles[i]);
    }
}

function eraseFromScreen(dots){
    dots.forEach(dot => {
        $(`#${dot.id}`).remove();
    });
}

function dist(x1, y1, x2, y2){
    x1 += 2;
    y1 += 2;
    x2 += 2;
    y2 += 2;
    return Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
}

var width = function(){return parseInt($("#area").width());};
var height = function(){return parseInt($("#area").height());};
