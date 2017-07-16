var animate = window.requestAnimationFrame || 
            function(callback) { window.setTimeout(callback, 1000/60) };

var canvas = document.createElement('canvas');
var width = 600;
var height = 400;
canvas.width = width;
canvas.height = height;
var context = canvas.getContext('2d');

var step = function() {
    update();
    render();
    animate(step);
};

var update = function() { 
    player.update();
};

var player = new Player();
var computer = new Computer();
var ball = new Ball(300, 200); //Ball start position

var render = function() {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, width, height);
    player.render();
    computer.render();
    ball.render();
};

/*=============== Paddle ================ */
function Paddle(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.x_speed = 0;
    this.y_speed = 0;
}

Paddle.prototype.render = function() {
    context.fillStyle = "#FFFFFF";
    context.fillRect(this.x, this.y, this.width, this.height);
};

Paddle.prototype.move = function(x, y) {
    this.x += x;
    this.y += y;
    this.x_speed = x;
    this.y_speed = y;
    if(this.y < 0) { // all the way up
        this.y = 0;
        this.y_speed = 0;
    } else if (this.y + this.height > 400) { // all the way down
        this.y = 400 -this.height;
        this.y_speed = 0;
    }
}


/*=============== Player ================ */
function Player() {
    this.paddle = new Paddle(10, 175, 10, 50);
}

Player.prototype.render = function() {
    this.paddle.render();
};

Player.prototype.update = function() {
    for(var key in keysDown) {
        var value = Number(key);
        if(value == 38) { // up arrow 
            this.paddle.move(0, -4); 
        } else if (value == 40) { // down arrow
            this.paddle.move(0, 4);
        } else {
            this.paddle.move(0, 0);
        }
    }
};

/*=============== CPU ================ */
function Computer() {
    this.paddle = new Paddle(580, 175, 10, 50);
}

Computer.prototype.render = function() {
    this.paddle.render();
};


/*=============== Ball ================ */
function Ball(x, y) {
    this.x = x;
    this.y = y;
    this.x_speed = 0;
    this.y_speed = 3;
    this.radius = 5;
}

Ball.prototype.render = function() {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
    context.fillStyle = "#FFFFFF";
    context.fill();
};

/*=============== Displaying it all and event listeners ================ */
window.onload = function() {
    document.body.appendChild(canvas);
    animate(step);
};

var keysDown = {};

window.addEventListener("keydown", function(event) {
    keysDown[event.keyCode] = true;
});

window.addEventListener("keyup", function(event) {
    delete keysDown[event.keyCode];
});