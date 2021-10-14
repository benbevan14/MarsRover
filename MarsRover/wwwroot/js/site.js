// Gallery Js
var form = document.getElementById("dateForm");
var input = document.getElementById("dateInput");

var apod_image = document.getElementById("apodImage");

var grid_Item5 = document.getElementById("gridItem5");

var apod_desc = document.getElementById("apodDescPhoto");


if (apod_image !== null) {
    if (apod_image.complete) {
        apod_desc.style.left = (740 - apod_image.width) / 2 + 50 + "px";
        apod_desc.style.right = (740 - apod_image.width) / 2 + 50 + "px";
        grid_Item5.style.marginBottom = "125px";
        apod_desc.classList.remove("hidden");
    }
    else
    {
        apod_desc.classList.add("hidden");
        apod_image.addEventListener("load", function () {
            apod_desc.style.left = (740 - apod_image.width) / 2 + 50 + "px";
            apod_desc.style.right = (740 - apod_image.width) / 2 + 50 + "px";
            grid_Item5.style.marginBottom = "125px";
            apod_desc.classList.remove("hidden");
        })
    }
   
}
else {
    /*var apod_desc = document.getElementById("apodDescPhoto")*/

    if (grid_Item5 !== null) {
        grid_Item5.style.marginBottom = "300px";
    }

   /* apod_desc.classList.remove("hidden");*/
}

if (input !== null) {
    input.addEventListener("change", function () {
        form.submit();
    })
}

// End of Gallery Js

// NavBar Js
$(function () {
    var str = '#len'; //increment by 1 up to 1-nelemnts
    $(document).ready(function () {
        var i, stop;
        i = 1;
        stop = 4; //num elements
        setInterval(function() {
                if (i > stop) {
                    return;
                }
                $('#len' + (i++)).toggleClass('bounce');
            },
            500);
    });
});
// End of Navbar JS

//menu stuff ==================================================

// html elements
var canvas = document.getElementById("gameMenu");
var context = canvas.getContext("2d");
var width = canvas.getAttribute("width");
var height = canvas.getAttribute("height");

// menu images
var bgImage = new Image();
var logoImage = new Image();
var playImage = new Image();

var settingsImage = new Image();
var highscoreImage = new Image();
var marsImage = new Image();

// options
var menu = true;

// declare sources for images
marsImage.src = "../img/marsimage.png";
bgImage.src = "../img/backgroundNew.png";
logoImage.src = "../img/MarsRoverTitle.png";
playImage.src = "../img/Play.png";
settingsImage.src = "../img/Settings.png";
highscoreImage.src = "../img/Highscores.png";

// button locations
var buttonX = [225, 140, 95];
var buttonY = [125, 180, 230];
var buttonWidth = [172, 347, 437];
var buttonHeight = [49, 55, 75];

// variables for parallax
var backgroundY = 0;
var speed = 0.5;

// mars variables
var marsX = [0, 0];
var marsY = [0, 0];
var marsWidth = 35;
var marsHeight = 40;
var marsVisible = false;
var marsSize = marsWidth;
var marsRotate = 0;

// mouse position
var mouseX;
var mouseY;

// draw menu when the images load
bgImage.onload = function () {
    context.drawImage(bgImage, 0, 0);
};
logoImage.onload = function () {
    context.drawImage(logoImage, 100, -10);
}
playImage.onload = function () {
    context.drawImage(playImage, buttonX[0], buttonY[0]);
}
settingsImage.onload = function () {
    context.drawImage(settingsImage, buttonX[1], buttonY[1]);
}
highscoreImage.onload = function () {
    context.drawImage(highscoreImage, buttonX[2], buttonY[2]);
}

// fade in menu
var timerId = setInterval(update, 1000 / frames);

// update function
function update() {
    clear();
    backgroundScroll();
    if (menu) {
        draw();
    } else {
        drawHighscores();
    }
}

function clear() {
    context.clearRect(0, 0, width, height);
}

function backgroundScroll() {
    backgroundY -= speed;
    if (backgroundY === -1 * height) {
        backgroundY = 0;
    }
    if (marsSize === marsWidth) {
        marsRotate = -0.25;
    }
    if (marsSize === 0) {
        marsRotate = 0.25;
    }
    marsSize += marsRotate;
}

function draw() {
    context.drawImage(bgImage, 0, backgroundY);
    context.drawImage(logoImage, 90, 20);
    context.drawImage(playImage, buttonX[0], buttonY[0]);
    context.drawImage(settingsImage, buttonX[1], buttonY[1]);
    context.drawImage(highscoreImage, buttonX[2], buttonY[2]);
    if (marsVisible === true) {
        context.drawImage(marsImage, marsX[0] - (marsSize / 2), marsY[0], marsSize, marsHeight);
        context.drawImage(marsImage, marsX[1] - (marsSize / 2), marsY[1], marsSize, marsHeight);
    }
}

function drawHighscores() {
    context.drawImage(bgImage, 0, backgroundY);
}

// add event listener to mouse
canvas.addEventListener("mousemove", checkPos);

// check mouse position function
function checkPos(mouseEvent) {

    if (mouseEvent.pageX || mouseEvent.pageY === 0) {
        mouseX = mouseEvent.pageX - this.offsetLeft;
        mouseY = mouseEvent.pageY - this.offsetTop;
    } else if (mouseEvent.offsetX || mouseEvent.offsetY === 0) {
        mouseX = mouseEvent.offsetX;
        mouseY = mouseEvent.offsetY;
    }

    for (var i = 0; i < buttonX.length; i++) {
        if (mouseX > buttonX[i] && mouseX < buttonX[i] + buttonWidth[i]) {
            if (mouseY > buttonY[i] && mouseY < buttonY[i] + buttonHeight[i]) {
                marsVisible = true;
                marsX[0] = buttonX[i] - (marsWidth / 2) - 2;
                marsY[0] = buttonY[i] + 2;
                marsX[1] = buttonX[i] + buttonWidth[i] + (marsWidth / 2);
                marsY[1] = buttonY[i] + 2;
            }
        } else {
            marsVisible = false;
        }
    }
}

// fading
var fadeId = 0;
canvas.addEventListener("mouseup", checkClick);
var time = 0.0;
fadeId = setInterval("fadeOut()", 1000 / frames);
clearInterval(timerId);

function checkClick(mouseEvent) {
    for (var i = 0; i < buttonX.length; i++) {
        if (mouseX > buttonX[i] && mouseX < buttonX[i] + buttonWidth[i]) {
            if (mouseY > buttonY[i] && mouseY < buttonY[i] + buttonHeight[i]) {
                if (i === 0) {
                    resetBoard();
                    main();
                    genFood();
                } else if (i === 2) {
                    menu = false;
                }
            }
        }
    }
}

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



// end of menu stuff





//start of snake game
var boardBorder = "black";
var boardBackground = "transparent";
var roverColor = "lightblue";
var roverBorder = "darkblue";

var rover = [
    { x: 64, y: 64 }
];

var score = 0;
// True if changing direction
var changingDirection = false;
// Horizontal velocity
var foodX;
var foodY;
var dx = 16;
// Vertical velocity
var dy = 0;

// Get the canvas element
var roverboard = document.getElementById("roverboard");
// Return a two dimensional drawing context
var roverboardCtx = roverboard.getContext("2d");

var rockImage = new Image();
rockImage.src = "../img/MarsFood.png";
var roverRock = new Image();
roverRock.src = "../img/RoverRock.png";
var roverN = new Image();
roverN.src = "../img/GameRoverN.png";
var roverE = new Image();
roverE.src = "../img/GameRoverE.png";
var roverS = new Image();
roverS.src = "../img/GameRoverS.png";
var roverW = new Image();
roverW.src = "../img/GameRoverW.png";


// INPUTS ==============================================================

// Let the game listen for keyboard inputs
document.addEventListener("keydown", changeDirection);

// to stop the up and down arrows scrolling the page
window.addEventListener("keydown",
    function(e) {
        if (["ArrowUp", "ArrowDown"].indexOf(e.code) > -1) {
            e.preventDefault();
        }
    },
    false);

// MAIN ==========================================================================

// main function called repeatedly to keep the game running
function main() {
    if (hasGameEnded()) {
        console.log("Game has ended");
        console.log(score);
        // do stuff to get username 
        // add high score to Scores.txt
        
        return;
    }

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


// DRAWING =======================================================

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

function drawFood() {
    roverboardCtx.drawImage(rockImage, foodX, foodY);
}

// Draw the rover on the canvas
function drawRover() {
    // Draw each part
    var head = rover[0]; // get first element
    var rocksArray = rover.slice(1); // remove the head from the array
    drawRoverHead(head);
    if (rover.length > 1) {
        rocksArray.forEach(drawRock);
    }
}

// Draw one rover part
function drawRoverHead(roverPart) {
    if (dx === 16 && dy === 0) roverboardCtx.drawImage(roverE, roverPart.x, roverPart.y);
    else if (dx === -16 && dy === 0) roverboardCtx.drawImage(roverW, roverPart.x, roverPart.y);
    else if (dx === 0 && dy === 16) roverboardCtx.drawImage(roverN, roverPart.x, roverPart.y);
    else if (dx === 0 && dy === -16) roverboardCtx.drawImage(roverS, roverPart.x, roverPart.y);
}

function drawRock(rock) {
    roverboardCtx.drawImage(roverRock, rock.x, rock.y);
}


// END DRAWING ====================================================================



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

function resetBoard() {
    score = 0;
    updateScore();
    changingDirection = false;
    clearBoard();
    dx = 16;
    dy = 0;
    rover = [
        { x: 64, y: 64 }
    ];
}

function randomFood(min, max) {
    return Math.round((Math.random() * (max - min) + min) / 16) * 16;
}

function genFood() {
    // Generate a random number the food x-coordinate
    foodX = randomFood(0, roverboard.width - 16);
    // Generate a random number for the food y-coordinate
    foodY = randomFood(0, roverboard.height - 16);
    // if the new food location is where the snake currently is, generate a new food location
    rover.forEach(function(part) {
        var hasEaten = part.x === foodX && part.y === foodY;
        if (hasEaten) genFood();
    });
}

function changeDirection(event) {
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
    var hasEatenFood = rover[0].x === foodX && rover[0].y === foodY;
    if (hasEatenFood) {
        // Increase score
        score += 1;
        // Display score on screen
        updateScore();
        // Generate new food location
        genFood();
    } else {
        // Remove the last part of rover body
        rover.pop();
    }
}

function updateScore() {
    document.getElementById("score").innerHTML = score;
}