//next step, make page responsive for mobile
document.addEventListener('load', loadObstacles());
addPolyPoints();
var obstacles = Array.from(document.getElementsByClassName('obstacles'));
//------handle key events-----
var map = {};
onkeydown = onkeyup = function(e){
    e = e || event;
    map[e.key] = e.type == 'keydown';
    if(map['w'] && map['d']){
        characterMovement('north-east');
    }
    else if(map['w'] && map['a']){
        characterMovement('north-west');
    }
    else if(map['s'] && map['d']){
        characterMovement('south-east');
    }
    else if(map['s'] && map['a']){
        characterMovement('south-west');
    }
    else if(map['w']){
        characterMovement('north');
    }
    else if(map['d']){
        characterMovement('east');
    }
    else if(map['s']){
        characterMovement('south');
    }
    else if(map['a']){
        characterMovement('west');
    }
    if(map[' ']){
        shootSquare(character);
    }
}
//------handle key events-----
//------movement wrapper-----
function characterMovement(direction){
    character.className = direction;
    var SPEED_LIMIT = 10;
    var characterClone = character.cloneNode(false);
    game.appendChild(characterClone);
    moveObject(characterClone, direction, SPEED_LIMIT);
    var dim = getDimensions(characterClone);
    var characterCollision = obstacleCollision(characterClone);
    var boundCheck = contains(polygon, dim.top, dim.left);
    if(!characterCollision.status && boundCheck == 1){
        moveObject(character, direction, SPEED_LIMIT);
    }
    characterClone.remove();
}

function projectileMovement(object, direction){
    var objdim = getDimensions(object);
    var SPEED_LIMIT = 20;
    if(contains(polygon, objdim.top, objdim.left) == 1){
        return moveObject(object, direction, SPEED_LIMIT);
    }
    return false;
}

function moveObject(object, direction, SPEED_LIMIT){
    var movement;

    if(direction == 'north' || direction == 'south'){
        movement = moveY(object, direction, SPEED_LIMIT);
    }
    else if(direction == 'east' || direction == 'west'){
        movement = moveX(object, direction, SPEED_LIMIT);
    }
    else{
        var X = 'east';
        var Y = 'north';
        if(direction.includes('west')){
            X = 'west';
        }
        if(direction.includes('south')){
            Y = 'south';
        }
        movement = moveY(object, Y, SPEED_LIMIT) && moveX(object, X, SPEED_LIMIT);
    }
    return movement;
}
//------movement wrapper-----
//----shoot Square---------
function shootSquare(object){
    var objectDimensions = getDimensions(object);
    var direction = object.className;

    var projectile = document.createElement('DIV');
    var projectileWidth = 10;
    var projectileHeight = 10;
    projectile.style.width = projectileWidth + 'px';
    projectile.style.height = projectileHeight + 'px';
    projectile.style.position = 'absolute';
    projectile.style.backgroundColor = 'black';

    var projectileTop = ((objectDimensions.height - projectileHeight) / 2) + objectDimensions.top;
    var projectileLeft = ((objectDimensions.width - projectileWidth) / 2) + objectDimensions.left;

    projectile.style.left = projectileLeft + 'px';
    projectile.style.top = projectileTop + 'px';

    game.appendChild(projectile);

    var INTERVAL_TIME = 100;

    var projectileInterval = setInterval(()=>{
        var movement = projectileMovement(projectile, direction);
        var projectileCollision = obstacleCollision(projectile);
        if(!movement || projectileCollision.status){
            if(projectileCollision.status){
                removeObstacle(projectileCollision.index);
            }
            clearInterval(projectileInterval);
            projectile.remove();
        }
    }, INTERVAL_TIME);
}
//----shoot Square---------
//---------obstacle destroyed---------
function removeObstacle(index){
    if(obstacles[index].classList.contains('enemy') || obstacles[index].classList.contains('environment-A')){
        obstacles[index].remove();
    }
}
//---------obstacle destroyed---------
//----Collision---------
function collision(objectOne, objectTwo){
    var rectangleOne = getDimensions(objectOne);
    var rectangleTwo = getDimensions(objectTwo);
    if (rectangleOne.left < rectangleTwo.right && rectangleOne.right > rectangleTwo.left && rectangleOne.top < rectangleTwo.bottom && rectangleOne.bottom > rectangleTwo.top) {
        return true; //collision detected
    }
    return false;
}

function obstacleCollision(object){
    var collisionResults = {
        status: false,
        index: null
    };

    for(var i = 0; i < obstacles.length; i++){
        if(collision(object, obstacles[i])){
            collisionResults.status = true;
            collisionResults.index = i;
            break;
        }
    }
    return collisionResults;
}
//----Collision-------