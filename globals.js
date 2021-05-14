//global vars
var character = document.getElementById('character');
var game = document.getElementById('game-container');

var obstaclePositions = [
    {
        top: 50,
        left: 100,
        height: 30,
        width: 30,
        role: 'enemy'
    },
    {
        top: 0,
        left: 100,
        height: 20,
        width: 80,
        role: 'environment-A'
    },
    {
        top: 230,
        left: 100,
        height: 20,
        width: 80,
        role: 'environment-B'
    }
];
//load environment objects
function loadObstacles(){
    for(var i = 0; i < obstaclePositions.length; i++){
        var obstacle = document.createElement('DIV');
        obstacle.style.width = obstaclePositions[i].width + 'px';
        obstacle.style.height = obstaclePositions[i].height + 'px';
        obstacle.style.top = obstaclePositions[i].top + 'px';
        obstacle.style.left = obstaclePositions[i].left + 'px';
        obstacle.className = 'obstacles';
        if(obstaclePositions[i].role == 'enemy'){
            obstacle.classList.add('enemy');
            obstacle.classList.add('south');
        }
        else if(obstaclePositions[i].role == 'environment-A'){
            obstacle.classList.add('environment-A');
        }
        else{
            obstacle.classList.add('environment-B');
        }
        game.appendChild(obstacle);
    }
}

//helper functions
function getDimensions(object){
    var width = parseInt(window.getComputedStyle(object).width.replace('px', ''));
    var height = parseInt(window.getComputedStyle(object).height.replace('px', ''));
    var left = parseInt(window.getComputedStyle(object).left.replace('px', ''));
    var right = left + width;
    var top = parseInt(window.getComputedStyle(object).top.replace('px', ''));
    var bottom = top + height;

    var returnObject = {
        left: left,
        right: right,
        top: top,
        bottom: bottom,
        width: width,
        height: height
    };

    return returnObject;
}
//driver code
//----movement functions---------
function moveX(object, direction, SPEED_LIMIT){
    var objectDimensions = getDimensions(object);
    var gameDimensions = getDimensions(game);

    var BOUNDS = {
        left: gameDimensions.left,
        right: gameDimensions.right
    };

    if(direction == 'west'){
        SPEED_LIMIT = SPEED_LIMIT * -1;
    }

    if((direction == 'east' && objectDimensions.right < BOUNDS.right) || (direction == 'west' && objectDimensions.left > BOUNDS.left)){
        objectDimensions.left+=SPEED_LIMIT;
        object.style.left = objectDimensions.left + 'px';
        return true;
    }

    return false;
}

function moveY(object, direction, SPEED_LIMIT){
    var objectDimensions = getDimensions(object);
    var gameDimensions = getDimensions(game);

    var BOUNDS = {
        top: gameDimensions.top,
        bottom: gameDimensions.bottom
    };

    if(direction == 'north'){
        SPEED_LIMIT = SPEED_LIMIT * -1;
    }
    
    if((direction == 'north' && objectDimensions.top > BOUNDS.top) || (direction == 'south' && objectDimensions.bottom < BOUNDS.bottom)){
        objectDimensions.top+=SPEED_LIMIT;
        object.style.top = objectDimensions.top + 'px';
        return true;
    }
    
    return false;
}
//----movement functions---------