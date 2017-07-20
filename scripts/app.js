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
    ball.update(player.paddle, computer.paddle);
  
};

var update = function() { 
    player.update();
    computer.update(ball);
    ball.update(player.paddle, computer.paddle);
    
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
    this.paddle = new Paddle(580, 175, 10, 50);
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

/*=============== CPU player ================ */
function Computer() {
    this.paddle = new Paddle(10, 175, 10, 50);
}

Computer.prototype.render = function() {
    this.paddle.render();
};

Computer.prototype.update = function(ball) {
    var y_pos = ball.y;
    var diff = -((this.paddle.y + (this.paddle.height / 2)) - y_pos);
    if(diff < 0 && diff < -4) { // max speed up
        diff = -5;
    } else if(diff > 0 && diff > 4) { // max speed down
        diff = 5;
    }
    this.paddle.move(0, diff);
    if(this.paddle.y < 0) {
        this.paddle.y = 0;
    } else if (this.paddle.y + this.paddle.height > 400) {
        this.paddle.y = 400 - this.paddle.height;
    }
};
   


/*=============== Ball ================ */
function Ball(x, y) {
    this.x = x;
    this.y = y;
    this.x_speed = 2;
    this.y_speed = 0;
    this.radius = 5;
}

Ball.prototype.render = function() {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
    context.fillStyle = "#FFFFFF";
    context.fill();
};

Ball.prototype.update = function(paddle1, paddle2) {
    this.x += this.x_speed;
    this.y += this.y_speed;
    var top_x = this.x - 5;
    var top_y = this.y - 5;
    var bottom_x = this.x + 5;
    var bottom_y = this.y + 5;

    //Ball colliding with top/bottom
    if(this.y - 5 < 0) {
        this.y = 5;
        this.y_speed = -this.y_speed;
    } else if (this.y + 5 > 400) {
        this.y = 395;
        this.y_speed = -this.y_speed;
    }

    //Reset ball on scoring
    if(this.x < 0 || this.x > 600) { //point scored
         this.x_speed = 2; //Reset direction
         this.y_speed = 0; //Reset direction
         this.x = 300; //reset position
         this.y = 200; //reset position
    }

    //Colliding with a paddle

    // console.log(paddle1)

    // if(this.x >580){
    //     if(Math.abs(this.y - paddle1.y) <= 20){
    //         this.x_speed = -this.x_speed;
    //     }
    // }

    // //console.log(paddle2)
    //   if(this.x > 560 ) {
    //      if(Math.abs(this.y - paddle2.y) < 100){
    //          this.x_speed = -this.x_speed    
    //      }
    //   }
    if(top_x > 300) {
        if(top_x < (paddle1.x + paddle1.width) && bottom_x > paddle1.x && top_y < (paddle1.y + paddle1.height) && bottom_y > paddle1.y) {
            // hit the player's paddle
            this.x_speed = -3;
            this.y_speed += (paddle1.y_speed / 2);
            this.x += this.x_speed;
        }
    } else {
        if(top_x < (paddle2.x + paddle2.width) && bottom_x > paddle2.x && top_y < (paddle2.y + paddle2.height) && bottom_y > paddle2.y) {
            //hit the computer's paddle
            this.x_speed = 3;
            this.y_speed += (paddle2.y_speed / 2);
            this.x += this.x_speed;
        }
    }   
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