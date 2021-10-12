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
var board_border = "black";
var board_background = "transparent";
var rover_col = "lightblue";
var rover_border = 'darkblue';



var rover = [
    { x: 64, y: 64 }
]


var score = 0;
// True if changing direction
var changing_direction = false;
// Horizontal velocity
var food_x;
var food_y;
var dx = 16;
// Vertical velocity
var dy = 0;


// Get the canvas element
var roverboard = document.getElementById("roverboard");
// Return a two dimensional drawing context
var roverboard_ctx = roverboard.getContext("2d");
// Start game
var roverStart = document.getElementById("buttonRoverGame");
document.addEventListener("keydown", change_direction);

rock_image = new Image();
rock_image.src = '../img/ResizedMarsRock.png';
rock_image.onload = function () {
    main();
    gen_food();
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
    roverboard.style.background = "url('../img/MarsBackground.png')";
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
}
// Draw one rover part
function draw_rover(roverPart) {
    // Set the colour of the rover part
    if (dx === 16 && dy === 0) roverboard_ctx.fillStyle = 'red';
    else if (dx === -16 && dy === 0) roverboard_ctx.fillStyle = 'green';
    else if (dx === 0 && dy === 16) roverboard_ctx.fillStyle = 'blue';
    else if (dx === 0 && dy === -16) roverboard_ctx.fillStyle = 'yellow';
    //roverboard_ctx.fillStyle = rover_col;
    // Set the border colour of the rover part
    roverboard_ctx.strokestyle = rover_border;
    // Draw a "filled" rectangle to represent the snake part at the coordinates
    // the part is located
    roverboard_ctx.fillRect(roverPart.x, roverPart.y, 16, 16);
    // Draw a border around the snake part
    roverboard_ctx.strokeRect(roverPart.x, roverPart.y, 16, 16);
}
function draw_rock(rock) {
    // Set the colour of the rover part
    roverboard_ctx.fillStyle= 'black';
    // Set the border colour of the rover part
    roverboard_ctx.strokestyle = rover_border;
    // Draw a "filled" rectangle to represent the snake part at the coordinates
    // the part is located
    roverboard_ctx.fillRect(rock.x, rock.y, 16, 16);
    // Draw a border around the snake part
    roverboard_ctx.strokeRect(rock.x, rock.y, 16, 16);
}
function has_game_ended() {
    for (let i = 4; i < rover.length; i++) {
        if (rover[i].x === rover[0].x && rover[i].y === rover[0].y) return true
    }
    var hitLeftWall = rover[0].x < 0;
    var hitRightWall = rover[0].x > roverboard.width - 16;
    var hitToptWall = rover[0].y < 0;
    var hitBottomWall = rover[0].y > roverboard.height - 16;
    return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
}

function random_food(min, max) {
    return Math.round((Math.random() * (max - min) + min) / 16) * 16;
}

function gen_food() {
    // Generate a random number the food x-coordinate
    food_x = random_food(0, roverboard.width - 16);
    // Generate a random number for the food y-coordinate
    food_y = random_food(0, roverboard.height - 16);
    // if the new food location is where the snake currently is, generate a new food location
    rover.forEach(function has_rover_eaten_food(part) {
        var has_eaten = part.x == food_x && part.y == food_y;
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
    var goingUp = dy === -16;
    var goingDown = dy === 16;
    var goingRight = dx === 16;
    var goingLeft = dx === -16;
    if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -16;
        dy = 0;
    }
    if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -16;
    }
    if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = 16;
        dy = 0;
    }
    if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = 16;
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

}

