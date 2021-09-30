const rulesBtn = document.getElementById("rules-btn");
const closeBtn = document.getElementById("close");
const rules = document.getElementById("rules");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let score = 0;

// * Rules event handlers

rulesBtn.addEventListener("click", () => {
  rules.classList.add("show");
});

closeBtn.addEventListener("click", () => {
  rules.classList.remove("show");
});

// * Create ball props

const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 10,
  speed: 4,
  dx: 4,
  dy: -4,
};

// * Create paddle props

const paddle = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 20,
  w: 80,
  h: 10,
  speec: 8,
  dx: 0,
};

// * Drawing ball on canvas
let drawBalls = () => {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fillStyle = "#0095dd";
  ctx.fill();
  ctx.closePath();
};

let drawPaddle = () => {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
  ctx.fillStyle = "#0095dd";
  ctx.fill();
  ctx.closePath();
};

let drawScore = () => {
  ctx.font = "20px Arial";
  ctx.fillText(`Score : ${score}`, canvas.width - 100, 30);
};

let draw = () => {
  drawBalls();
  drawPaddle();
  drawScore();
};

draw();
