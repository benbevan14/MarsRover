// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

// NavBar Js
$(function () {
    var str = '#len'; //increment by 1 up to 1-nelemnts
    $(document).ready(function () {
        var i, stop;
        i = 1;
        stop = 4; //num elements
        setInterval(function () {
            if (i > stop) {
                return;
            }
            $('#len' + (i++)).toggleClass('bounce');
        }, 500)
    });
});
// End of Navbar JS
//---------------------------------------------START OF MENU ------------------------------------------
//declaring menu variables 
var canvas = document.getElementById("myMenu");
var context = canvas.getContext("2d");
var width = canvas.getAttribute('width');
var height = canvas.getAttribute('height');

//Menu Items
var bgImage = new Image();
var logoImage = new Image();
var playImage = new Image();
var instructImage = new Image();
var settingsImage = new Image();
var creditsImage = new Image();
var shipImage = new Image();

//Image for menu
shipImage.src = "../img/ship.png";
bgImage.src = "../img/Background.png";
logoImage.src = "../img/logo.png";
playImage.src = "../img/play.png";
instructImage.src = "../img/instructions.png";
settingsImage.src = "../img/settings.png";
creditsImage.src = "../img/credits.png";

//button locations
var buttonX = [192, 110, 149, 160];
var buttonY = [100, 140, 180, 220];
var buttonWidth = [96, 260, 182, 160];
var buttonHeight = [40, 40, 40, 40];

//draws images on top
bgImage.onload = function () {
    context.drawImage(bgImage, 0, 0);
};
logoImage.onload = function () {
    context.drawImage(logoImage, 50, -10);
}
playImage.onload = function () {
    context.drawImage(playImage, buttonX[0], buttonY[0]);
}
instructImage.onload = function () {
    context.drawImage(instructImage, buttonX[1], buttonY[1]);
}
settingsImage.onload = function () {
    context.drawImage(settingsImage, buttonX[2], buttonY[2]);
}
creditsImage.onload = function () {
    context.drawImage(creditsImage, buttonX[3], buttonY[3]);
}



timerId = setInterval(update, 1000 / frames);

//update function
function update() {
    clear();
    move();
    draw();
}
// clearing function 
function clear() {
    context.clearRect(0, 0, width, height);
}
// variables
var backgroundY = 0;
var speed = 1;

//background scrolling
function move() {
    backgroundY -= speed;
    if (backgroundY === -1 * height) {
        backgroundY = 0;
    }
    if (shipSize === shipWidth) {
        shipRotate = -1;
    }
    if (shipSize === 0) {
        shipRotate = 1;
    }
    shipSize += shipRotate;
}
// draws the images
function draw() {
    context.drawImage(bgImage, 0, backgroundY);
    context.drawImage(logoImage, 50, -10);
    context.drawImage(playImage, buttonX[0], buttonY[0]);
    context.drawImage(instructImage, buttonX[1], buttonY[1]);
    context.drawImage(settingsImage, buttonX[2], buttonY[2]);
    context.drawImage(creditsImage, buttonX[3], buttonY[3]);
    if (shipVisible === true) {
        context.drawImage(shipImage, shipX[0] - (shipSize / 2), shipY[0], shipSize, shipHeight);
        context.drawImage(shipImage, shipX[1] - (shipSize / 2), shipY[1], shipSize, shipHeight);
    }
}

//check mouse pos
var mouseX;
var mouseY;

canvas.addEventListener("mousemove", checkPos);

function checkPos(mouseEvent) {
    mouseX = mouseEvent.pageX - this.offsetLeft;
    mouseY = mouseEvent.pageY - this.offsetTop;

    for (i = 0; i < buttonX.length; i++) {
        if (mouseX > buttonX[i] && mouseX < buttonX[i] + buttonWidth[i]) {
            if (mouseY > buttonY[i] && mouseY < buttonY[i] + buttonHeight[i]) {
                shipVisible = true;
                shipX[0] = buttonX[i] - (shipWidth / 2) - 2;
                shipY[0] = buttonY[i] + 2;
                shipX[1] = buttonX[i] + buttonWidth[i] + (shipWidth / 2);
                shipY[1] = buttonY[i] + 2;
            }
        } else {
            shipVisible = false;
        }
    }

    if (mouseEvent.pageX || mouseEvent.pageY === 0) {
        mouseX = mouseEvent.pageX - this.offsetLeft;
        mouseY = mouseEvent.pageY - this.offsetTop;
    } else if (mouseEvent.offsetX || mouseEvent.offsetY === 0) {
        mouseX = mouseEvent.offsetX;
        mouseY = mouseEvent.offsetY;
    }
}


//draw the ship
var shipX = [0, 0];
var shipY = [0, 0];
var shipWidth = 35;
var shipHeight = 40;

var shipVisible = false;
var shipSize = shipWidth;
var shipRotate = 0;

//checking mouse clicks
var fadeId = 0;
canvas.addEventListener("mouseup", checkClick);

function checkClick(mouseEvent) {
    for (i = 0; i < buttonX.length; i++) {
        if (mouseX > buttonX[i] && mouseX < buttonX[i] + buttonWidth[i]) {
            if (mouseY > buttonY[i] && mouseY < buttonY[i] + buttonHeight[i]) {
                main();
                gen_food();
                restart_game();
            }
        }
    }
}

function hideCanvas() {
    canvas.style.display = "none";
}
fadeId = setInterval("fadeOut()", 1000 / frames);
clearInterval(timerId);
canvas.removeEventListener("mousemove", checkPos);
canvas.removeEventListener("mouseup", checkClick);
var time = 0.0;

function fadeOut() {
    context.fillStyle = "rgba(0,0,0, 0.2)";
    context.fillRect(0, 0, width, height);
    time += 0.1;
    if (time >= 2) {
        clearInterval(fadeId);
        time = 0;
        timerId = setInterval("update()", 1000 / frames);
        canvas.addEventListener("mousemove", checkPos);
        canvas.addEventListener("mouseup", checkClick);
    }
}

//end of menu

var rover = [
    { x: 100, y: 100 }
]

    score = 0;
    // True if changing direction
    changing_direction = false;
    // Horizontal velocity
    food_x;
    food_y;
    dx = 10;
    // Vertical velocity
    dy = 0;
}

startingGame();

// Get the canvas element
var roverboard = document.getElementById("roverboard");
// Return a two dimensional drawing context
var roverboard_ctx = roverboard.getContext("2d");
// Start game
var roverStart = document.getElementById("buttonRoverGame");
document.addEventListener("keydown", change_direction);

rock_image = new Image();
rock_image.src = '../img/ResizedMarsRock.png';



// main function called repeatedly to keep the game running
function main() {

    if (has_game_ended()) return;
    changing_direction = false;
    setTimeout(function onTick() {
        clear_board();
        drawFood();
        move_rover();
        drawRover();
        // Repeat
        main();
    }, 100)
}

// draw a border around the canvas
function clear_board() {
    //  Select the colour to fill the drawing
    roverboard_ctx.fillStyle = board_background;
    //  Select the colour for the border of the canvas
    roverboard_ctx.strokestyle = board_border;
    // Draw a "filled" rectangle to cover the entire canvas
    roverboard_ctx.clearRect(0, 0, roverboard.width, roverboard.height);
    // Draw a "border" around the entire canvas
    roverboard_ctx.strokeRect(0, 0, roverboard.width, roverboard.height);
}

// Draw the rover on the canvas
function drawRover() {
    // Draw each part
    head = rover[0]; // get first element
    rocks_array = rover.slice(1); // remove the head from the array
    draw_rover(head);
    if (rover.length > 1) {
        rocks_array.forEach(draw_rock);
    }
    
}

function drawFood() {
    roverboard_ctx.drawImage(rock_image, food_x, food_y);
    roverboard_ctx.fillStyle = 'Crimson';
    roverboard_ctx.strokestyle = 'DarkRed';
    roverboard_ctx.fillRect(food_x, food_y, 10, 10);
    roverboard_ctx.strokeRect(food_x, food_y, 10, 10);
}
// Draw one rover part
function draw_rover(roverPart) {
    // Set the colour of the rover part
    if (dx === 10 && dy === 0) roverboard_ctx.fillStyle = 'red';
    else if (dx === -10 && dy === 0) roverboard_ctx.fillStyle = 'green';
    else if (dx === 0 && dy === 10) roverboard_ctx.fillStyle = 'blue';
    else if (dx === 0 && dy === -10) roverboard_ctx.fillStyle = 'yellow';
    //roverboard_ctx.fillStyle = rover_col;
    // Set the border colour of the rover part
    roverboard_ctx.strokestyle = rover_border;
    // Draw a "filled" rectangle to represent the snake part at the coordinates
    // the part is located
    roverboard_ctx.fillRect(roverPart.x, roverPart.y, 10, 10);
    // Draw a border around the snake part
    roverboard_ctx.strokeRect(roverPart.x, roverPart.y, 10, 10);
}
function draw_rock(rock) {
    // Set the colour of the rover part
    roverboard_ctx.fillStyle= 'black';
    // Set the border colour of the rover part
    roverboard_ctx.strokestyle = rover_border;
    // Draw a "filled" rectangle to represent the snake part at the coordinates
    // the part is located
    roverboard_ctx.fillRect(rock.x, rock.y, 10, 10);
    // Draw a border around the snake part
    roverboard_ctx.strokeRect(rock.x, rock.y, 10, 10);
}
function has_game_ended() {
    for (let i = 4; i < rover.length; i++) {
        if (rover[i].x === rover[0].x && rover[i].y === rover[0].y) return true;
    }
    var hitLeftWall = rover[0].x < 0;
    var hitRightWall = rover[0].x > roverboard.width - 10;
    var hitTopWall = rover[0].y < 0;
    var hitBottomWall = rover[0].y > roverboard.height - 10;
    return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
}

function random_food(min, max) {
    return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}

function gen_food() {
    // Generate a random number the food x-coordinate
    food_x = random_food(0, roverboard.width - 10);
    // Generate a random number for the food y-coordinate
    food_y = random_food(0, roverboard.height - 10);
    // if the new food location is where the snake currently is, generate a new food location
    rover.forEach(function has_rover_eaten_food(part) {
        var has_eaten = part.x === food_x && part.y === food_y;
        if (has_eaten) gen_food();
    });
}

function change_direction(event) {
    var LEFT_KEY = 37;
    var RIGHT_KEY = 39;
    var UP_KEY = 38;
    var DOWN_KEY = 40;

    // Prevent the snake from reversing

    if (changing_direction) return;
    changing_direction = true;
    var keyPressed = event.keyCode;
    var goingUp = dy === -10;
    var goingDown = dy === 10;
    var goingRight = dx === 10;
    var goingLeft = dx === -10;
    if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -10;
        dy = 0;
    }
    if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -10;
    }
    if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = 10;
        dy = 0;
    }
    if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = 10;
    }
}

function move_rover() {
    // Create the new rover's head
    var head = { x: rover[0].x + dx, y: rover[0].y + dy };
    // Add the new head to the beginning of snake body
    rover.unshift(head);
    var has_eaten_food = rover[0].x === food_x && rover[0].y === food_y;
    if (has_eaten_food) {
        // Increase score
        score += 10;
        // Display score on screen
        document.getElementById('score').innerHTML = score;
        // Generate new food location
        gen_food();
    } else {
        // Remove the last part of rover body
        rover.pop();
    }
}

function start_game() {

    if (document.getElementById('buttonRoverGame').clicked === true) {
        main();
        gen_food();
        
    } else {
        //do nothing
    }
}

function restart_game() {
    if (has_game_ended() === true) {
        startingGame();
        update();
    }
}

function highestScoreInput() {
   
    var highScore;

    
}

function storeHighScore() {

}

function inputName() {

    score;
    document.getElementById("inputName");
}