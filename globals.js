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

var polygon = [
    {
        x: 20,
        y: 200
    },
    {
        x: 20,
        y: 150
    },
    {
        x: 50,
        y: 100
    },
    {
        x: 20,
        y: 20
    },
    {
        x: 400,
        y: 20
    },
    {
        x: 450,
        y: 100
    },
    {
        x: 400,
        y: 150
    },
    {
        x: 400,
        y: 200
    }
];

function addPolyPoints(){
    for(var i = 0; i < polygon.length; i++){
        var new_square = document.createElement('DIV');
        new_square.style.left = polygon[i].x + 'px';
        new_square.style.top = polygon[i].y + 'px';
        new_square.className = 'squares';
        game.appendChild(new_square);
    }
}

function contains(bounds, lat, lng) {
    //https://rosettacode.org/wiki/Ray-casting_algorithm
    var count = 0;
    for (var b = 0; b < bounds.length; b++) {
        var vertex1 = bounds[b];
        var vertex2 = bounds[(b + 1) % bounds.length];
        if (west(vertex1, vertex2, lng, lat))
            ++count;
    }
    return count % 2;
 
    /**
     * @return {boolean} true if (x,y) is west of the line segment connecting A and B
     */
    function west(A, B, x, y) {
        if (A.y <= B.y) {
            if (y <= A.y || y > B.y ||
                x >= A.x && x >= B.x) {
                return false;
            } else if (x < A.x && x < B.x) {
                return true;
            } else {
                return (y - A.y) / (x - A.x) > (B.y - A.y) / (B.x - A.x);
            }
        } else {
            return west(B, A, x, y);
        }
    }
}
