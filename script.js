const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");

const box = 30;
const canvasSize = 600;
const gridSize = canvasSize / box;
let snake = [{ x: box, y: box }];
let direction;
let food = { x: 0, y: 0 };
let score = 0;

function getRandomPosition() {
  return Math.floor(Math.random() * gridSize) * box;
}

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Draw snake
  snake.forEach((segment, index) => {
    context.fillStyle = index === 0 ? "green" : "lightgreen";
    context.fillRect(segment.x, segment.y, box, box);
    context.strokeStyle = "darkgreen";
    context.strokeRect(segment.x, segment.y, box, box);
  });

  // Draw food
  context.fillStyle = "red";
  context.fillRect(food.x, food.y, box, box);
  context.strokeStyle = "darkred";
  context.strokeRect(food.x, food.y, box, box);

  // Draw score
  context.fillStyle = "black";
  context.font = "20px Arial";
  context.fillText("Score: " + score, box, 1.6 * box);

  // Update snake position
  let head = { x: snake[0].x, y: snake[0].y };
  if (direction === "LEFT") head.x -= box;
  if (direction === "UP") head.y -= box;
  if (direction === "RIGHT") head.x += box;
  if (direction === "DOWN") head.y += box;

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    // Snake eats food
    score++;
    food = { x: getRandomPosition(), y: getRandomPosition() };
  } else {
    // Remove tail segment
    snake.pop();
  }
}

function changeDirection(event) {
  const keyPressed = event.keyCode;
  if (keyPressed === 37 && direction !== "RIGHT") direction = "LEFT";
  if (keyPressed === 38 && direction !== "DOWN") direction = "UP";
  if (keyPressed === 39 && direction !== "LEFT") direction = "RIGHT";
  if (keyPressed === 40 && direction !== "UP") direction = "DOWN";
}

document.addEventListener("keydown", changeDirection);

function startGame() {
  // Set canvas size
  canvas.width = canvasSize;
  canvas.height = canvasSize;

  // Initial snake position
  snake = [{ x: box, y: box }];

  // Initial food position
  food = { x: getRandomPosition(), y: getRandomPosition() };

  // Initial direction
  direction = "RIGHT";
  score = 0;

  setInterval(draw, 150); // Snake movement speed
}

startGame();