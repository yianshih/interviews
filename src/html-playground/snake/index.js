const DIRECTION_OPPOSITE = {
  up: "down",
  down: "up",
  left: "right",
  right: "left",
};

class Snake {
  constructor(ctx, x, y, unit, color, border, maxX, maxY) {
    this.color = color;
    this.border = border;
    this.ctx = ctx;
    this.unit = unit;
    this.body = [{ x, y }];
    this.direction = "down";
    this.maxX = maxX;
    this.maxY = maxY;
  }

  setDirection(newDirection) {
    if (
      this.body.length > 1 &&
      DIRECTION_OPPOSITE[this.direction] === newDirection
    ) {
      return this;
    }

    this.direction = newDirection;
    return this;
  }

  getMovement() {
    switch (this.direction) {
      case "up":
        return {
          x: 0,
          y: -this.unit,
        };
      case "down":
        return {
          x: 0,
          y: this.unit,
        };
      case "left":
        return {
          x: -this.unit,
          y: 0,
        };
      case "right":
        return {
          x: this.unit,
          y: 0,
        };
      default:
        return {
          x: 0,
          y: 0,
        };
    }
  }

  /**
   *
   * @param {{x:number,y:number}} food
   * @param {()=>void} eatFoodCb
   * @param {()=>void} gameOverCb
   * @returns
   */
  move(food, eatFoodCb, gameOverCb) {
    if (!this.body.length) return this;
    const { x, y } = this.getMovement();
    let newHead = {
      x: this.body[0].x + x,
      y: this.body[0].y + y,
    };

    if (
      newHead.x > this.maxX ||
      newHead.y > this.maxY ||
      newHead.x < 0 ||
      newHead.y < 0 ||
      this.body.some(({ x, y }) => newHead.x === x && newHead.y === y)
    ) {
      gameOverCb();
    }

    this.body.unshift(newHead);

    if (food && newHead.x === food.x && newHead.y === food.y) {
      eatFoodCb();
    } else {
      this.body.pop();
    }
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.strokeStyle = this.border;
    this.body.forEach(({ x, y }) => {
      this.ctx.fillRect(x, y, unitSize, unitSize);
      // this.ctx.strokeRect(x, y, unitSize, unitSize);
    });
  }
}

const gameBoard = document.querySelector("#game-board");
const canvaCtx = gameBoard.getContext("2d");
const resetBtn = document.querySelector("#reset");
const scoreText = document.querySelector("#score-text");
const speedText = document.querySelector("#speed-text");

const boardWidth = gameBoard.width;
const boardHeight = gameBoard.height;

const defaultInterval = 500;
let gameSpeed = 1;

const boardBackground = "white";

const unitSize = 25;

const xUnits = boardWidth / unitSize;
const yUnits = boardHeight / unitSize;

let score = 0;

let food = null;

let snake = new Snake(
  canvaCtx,
  Math.floor(xUnits / 2) * unitSize,
  Math.floor(yUnits / 2) * unitSize,
  unitSize,
  "green",
  "black",
  boardWidth - unitSize,
  boardHeight - unitSize
);

const resetSnake = () => {
  snake = new Snake(
    canvaCtx,
    Math.floor(xUnits / 2) * unitSize,
    Math.floor(yUnits / 2) * unitSize,
    unitSize,
    "green",
    "black",
    boardWidth - unitSize,
    boardHeight - unitSize
  );
};

resetSnake();

/**
 *
 * @param {number} totalUnits
 * @param {{x:number,y:number}[]} body
 */
const generateFood = (totalUnits, body) => {
  const unitIndex = Math.round(Math.random() * totalUnits);

  const bodyUnits = new Set(
    body?.map(({ x, y }) => ((x / unitSize) * y) / unitSize)
  );

  const unitArr = Array.from({ length: totalUnits }, (_, i) => {
    if (bodyUnits.has(i)) {
      return i - 1 >= 0 ? i - 1 : 0;
    }
    return i;
  });

  const foodIndex = unitArr[unitIndex];

  const x = (foodIndex % xUnits) * unitSize;
  const y = Math.floor(foodIndex / xUnits) * unitSize;

  food = { x, y };
};

const drawFood = () => {
  if (!food) return;

  canvaCtx.fillStyle = "red";
  canvaCtx.strokeStyle = "black";
  canvaCtx.fillRect(food.x, food.y, unitSize, unitSize);
  // canvaCtx.strokeRect(food.x, food.y, unitSize, unitSize);
};

function clearBoard() {
  canvaCtx.fillStyle = boardBackground;
  canvaCtx.fillRect(0, 0, boardWidth, boardHeight);
}

let interval = null;

generateFood(xUnits * yUnits, snake.body);
drawFood();

const eatFood = () => {
  score++;
  gameSpeed = Number((gameSpeed * 1.1).toFixed(1));

  scoreText.textContent = score;
  speedText.textContent = gameSpeed;
  generateFood(xUnits * yUnits, snake.body);
  drawFood();
};

const start = () => {
  if (interval) {
    window.clearInterval(interval);
  }

  interval = window.setInterval(() => {
    clearBoard();
    drawFood();
    snake.move(food, eatFood, gameOver);
    snake.draw();
  }, defaultInterval / gameSpeed);
};

const gameOver = () => {
  window.alert("Game Over");
  score = 0;
  gameSpeed = 1;
  resetSnake();
  start();
};
resetBtn.addEventListener("click", (e) => {
  start();
});

const KEY_CODE_DIRECTION_MAPPER = {
  ArrowRight: "right",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowUp: "up",
};

window.addEventListener("keydown", (e) => {
  const newDirection = KEY_CODE_DIRECTION_MAPPER[e.code];
  if (newDirection) {
    snake.setDirection(newDirection);
    clearBoard();
    drawFood();
    snake.move(food, eatFood, gameOver);
    snake.draw();
    start();
  }
});
