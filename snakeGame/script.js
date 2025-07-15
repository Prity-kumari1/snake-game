const board = document.getElementById("gameBoard");
const ctx = board.getContext("2d");
const box = 20; // size of snake square
const canvasSize = 400;


let snake = [];
snake[0] = { x: 9 * box, y: 10 * box }; // head at start

let food = {
  x: Math.floor(Math.random() * (canvasSize / box)) * box,
  y: Math.floor(Math.random() * (canvasSize / box)) * box,
};

let direction = null;

document.addEventListener("keydown", directionControl);

function directionControl(event) {
  if (event.key === "ArrowLeft" && direction !== "RIGHT") {
    direction = "LEFT";
  } else if (event.key === "ArrowUp" && direction !== "DOWN") {
    direction = "UP";
  } else if (event.key === "ArrowRight" && direction !== "LEFT") {
    direction = "RIGHT";
  } else if (event.key === "ArrowDown" && direction !== "UP") {
    direction = "DOWN";
  }
}

function draw() {
  ctx.fillStyle = "#222";
  ctx.fillRect(0, 0, canvasSize, canvasSize);

  // Draw snake
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "lime" : "green";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);

    ctx.strokeStyle = "#111";
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }

  // Draw food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);

  // Old head position
  let headX = snake[0].x;
  let headY = snake[0].y;

  // Update head position
  if (direction === "LEFT") headX -= box;
  if (direction === "UP") headY -= box;
  if (direction === "RIGHT") headX += box;
  if (direction === "DOWN") headY += box;

  // Check collision with food
  if (headX === food.x && headY === food.y) {
    food = {
      x: Math.floor(Math.random() * (canvasSize / box)) * box,
      y: Math.floor(Math.random() * (canvasSize / box)) * box,
    };

    // Snake grows -> don't remove tail
  } else {
    snake.pop(); // remove tail
  }

  let newHead = { x: headX, y: headY };

  //  pass-through logic
  if (headX < 0) {
    headX = canvasSize - box; // appear on right
  } else if (headX >= canvasSize) {
    headX = 0; // appear on left
  }
  
  if (headY < 0) {
    headY = canvasSize - box; // appear at bottom
  } else if (headY >= canvasSize) {
    headY = 0; // appear at top
  }
  
  newHead = { x: headX, y: headY };
  
  // Game over conditions
  if (collision(newHead, snake)) {
    const gridX = Math.floor(newHead.x / box);
    const gridY = Math.floor(newHead.y / box);
    console.log(`Game Over! Snake head position: (${gridX}, ${gridY})`);
    clearInterval(game);
    showRamUses();
    alert("Game Over!");
  }

  snake.unshift(newHead); // add new head

// ... (rest of your code remains the same)
//   if (
//     headX < 0 ||
//     headY < 0 ||
//     headX >= canvasSize ||
//     headY >= canvasSize ||
//     collision(newHead, snake)
//   ) {
//     const gridX = Math.floor(newHead.x / box);
//     const gridY = Math.floor(newHead.y / box);
//     console.log(`Game Over! Snake head position: (${gridX}, ${gridY})`);

//     clearInterval(game);
//     showRamUses()
//     alert("Game Over!");
//   }

//   snake.unshift(newHead); // add new head
}

function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x === array[i].x && head.y === array[i].y) {
      return true;
    }
  }
  return false;
}
function showRamUses() {
  if (performance.memory) {
    const ramUseMB = performance.memory.usedJSHeapSize / 1024 / 1024;
    document.getElementById("ram-info").innerHTML = ` RAM Usage: ${ramUseMB.toFixed(2)} MB`
  }
  else {
    document.getElementById("ram-info").innerHTML = ` RAM info not Supported`
  }
}
let game = setInterval(draw, 100)

