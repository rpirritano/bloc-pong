var animate = window.requestAnimationFrame ||
              function(callback) { window.setTimeout(callback, 1000/60) };

function Paddle(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

function Ball(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
}

function Player() {
    this.paddle = new Paddle(5, 225, 8, 70);
}

function Computer() {
    this.paddle = new Paddle(787, 275, 8, 70);
}

Paddle.prototype.render = function(context) {
    context.beginPath();
    context.rect(this.x, this.y, this.width, this.height);
    context.fillStyle = "white";
    context.fill();
};

Ball.prototype.render = function(context) {
    context.beginPath();
    context.arc(40 ,40, this.radius, 0, 2 * Math.PI );
    context.strokeStyle = "black";
    context.stroke();
    context.fillStyle = "white";
    context.fill();
};

Player.prototype.render = function(context) {
    this.paddle.render(context);
};

Computer.prototype.render = function(context) {
    this.paddle.render(context);
};

var player = new Player();
var computer = new Computer();
var ball = new Ball(400, 250, 10);

function render(context) {
    player.render(context);
    computer.render(context);
    ball.render(context);
}

window.onload = function () {
  var canvas = document.getElementById("pongTable");
  var context = canvas.getContext("2d");
  render(context)
}