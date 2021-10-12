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









//start of snake game
var boardBorder = "black";
var boardBackground = "transparent";
var roverColor = "lightblue";
var roverBorder = "darkblue";

var rover = [
    { x: 64, y: 64 }
]

var score = 0;
// True if changing direction
var changingDirection = false;
// Horizontal velocity
var food_x;
var food_y;
var dx = 16;
// Vertical velocity
var dy = 0;

// Get the canvas element
var roverboard = document.getElementById("roverboard");
// Return a two dimensional drawing context
var roverboardCtx = roverboard.getContext("2d");
// Start game
var roverStart = document.getElementById("buttonRoverGame");
document.addEventListener("keydown", change_direction);

rockImage = new Image();
rockImage.src = "../img/MarsFood.png";
rockImage.onload = function () {
    main();
    genFood();
}

window.addEventListener("keydown",
    function(e) {
        if (["ArrowUp", "ArrowDown"].indexOf(e.code) > -1) {
            e.preventDefault();
        }
    },
    false);

// main function called repeatedly to keep the game running
function main() {

    if (hasGameEnded()) return;

    changingDirection = false;
    setTimeout(function() {
            clearBoard();
            drawFood();
            moveRover();
            drawRover();
            // Repeat
            main();
        },
        100);
}

// draw a border around the canvas
function clearBoard() {
    //  Select the color to fill the drawing
    roverboardCtx.fillStyle = boardBackground;
    //  Select the color for the border of the canvas
    roverboardCtx.strokestyle = boardBorder;
    // Draw a "filled" rectangle to cover the entire canvas
    roverboardCtx.clearRect(0, 0, roverboard.width, roverboard.height);
    // Draw a "border" around the entire canvas
    roverboardCtx.strokeRect(0, 0, roverboard.width, roverboard.height);
    roverboard.style.background = "url('../img/FinalMarsBackground.png')";
}

// Draw the rover on the canvas
function drawRover() {
    // Draw each part
    var head = rover[0]; // get first element
    var rocksArray = rover.slice(1); // remove the head from the array
    drawRoverPart(head);
    if (rover.length > 1) {
        rocksArray.forEach(drawRock);
    }
}

function drawFood() {
    roverboardCtx.drawImage(rockImage, food_x, food_y);
}

// Draw one rover part
function drawRoverPart(roverPart) {
    // Set the color of the rover part
    if (dx === 16 && dy === 0) roverboardCtx.fillStyle = "red";
    else if (dx === -16 && dy === 0) roverboardCtx.fillStyle = "green";
    else if (dx === 0 && dy === 16) roverboardCtx.fillStyle = "blue";
    else if (dx === 0 && dy === -16) roverboardCtx.fillStyle = "yellow";
    //roverboardCtx.fillStyle = roverColor;
    // Set the border color of the rover part
    roverboardCtx.strokestyle = roverBorder;
    // Draw a "filled" rectangle to represent the snake part at the coordinates
    // the part is located
    roverboardCtx.fillRect(roverPart.x, roverPart.y, 16, 16);
    // Draw a border around the snake part
    roverboardCtx.strokeRect(roverPart.x, roverPart.y, 16, 16);
}
function drawRock(rock) {
    // Set the color of the rover part
    roverboardCtx.fillStyle= "black";
    // Set the border color of the rover part
    roverboardCtx.strokestyle = roverBorder;
    // Draw a "filled" rectangle to represent the snake part at the coordinates
    // the part is located
    roverboardCtx.fillRect(rock.x, rock.y, 16, 16);
    // Draw a border around the snake part
    roverboardCtx.strokeRect(rock.x, rock.y, 16, 16);
}
function hasGameEnded() {
    for (let i = 4; i < rover.length; i++) {
        if (rover[i].x === rover[0].x && rover[i].y === rover[0].y) return true;
    }
    var hitLeftWall = rover[0].x < 0;
    var hitRightWall = rover[0].x > roverboard.width - 16;
    var hitTopWall = rover[0].y < 0;
    var hitBottomWall = rover[0].y > roverboard.height - 16;
    return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
}

function randomFood(min, max) {
    return Math.round((Math.random() * (max - min) + min) / 16) * 16;
}

function genFood() {
    // Generate a random number the food x-coordinate
    food_x = randomFood(0, roverboard.width - 16);
    // Generate a random number for the food y-coordinate
    food_y = randomFood(0, roverboard.height - 16);
    // if the new food location is where the snake currently is, generate a new food location
    rover.forEach(function(part) {
        var hasEaten = part.x === food_x && part.y === food_y;
        if (hasEaten) genFood();
    });
}

function change_direction(event) {
    var leftKey = 37;
    var rightKey = 39;
    var upKey = 38;
    var downKey = 40;

    // Prevent the snake from reversing

    if (changingDirection) return;
    changingDirection = true;
    var keyPressed = event.keyCode;
    var goingUp = dy === -16;
    var goingDown = dy === 16;
    var goingRight = dx === 16;
    var goingLeft = dx === -16;
    if (keyPressed === leftKey && !goingRight) {
        dx = -16;
        dy = 0;
    }
    if (keyPressed === upKey && !goingDown) {
        dx = 0;
        dy = -16;
    }
    if (keyPressed === rightKey && !goingLeft) {
        dx = 16;
        dy = 0;
    }
    if (keyPressed === downKey && !goingUp) {
        dx = 0;
        dy = 16;
    }
}

function moveRover() {
    // Create the new rover's head
    var head = { x: rover[0].x + dx, y: rover[0].y + dy };
    // Add the new head to the beginning of snake body
    rover.unshift(head);
    var hasEatenFood = rover[0].x === food_x && rover[0].y === food_y;
    if (hasEatenFood) {
        // Increase score
        score += 10;
        // Display score on screen
        document.getElementById("score").innerHTML = score;
        // Generate new food location
        genFood();
    } else {
        // Remove the last part of rover body
        rover.pop();
    }
}

function start_game() {

    if (document.getElementById("buttonRoverGame").clicked === true) {
        main();
        genFood();
    } else {
        //do nothing
    }
}

function restart_game() {

}

