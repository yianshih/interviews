const target = document.querySelector("#target");
const scoreText = document.querySelector("#score");
const roundText = document.querySelector("#round");
const startBtn = document.querySelector("#start");

const containerWidth = 500;
const containerHeight = 500;

const targetWidth = 50;
const targetHeight = 50;

const maxRound = 10;

const maxRoundScore = 1000;
let currentRound = 1;
let score = 0;
let time = null;

/**
 * @param {number} width
 * @param {number} height
 */
const moveTarget = (maxX, maxY) => {
  time = new Date().getTime();
  const x = Math.round(Math.random() * maxX);
  const y = Math.round(Math.random() * maxY);

  target.style.left = `${x}px`;
  target.style.top = `${y}px`;
};

const updateGameInfo = () => {
  scoreText.textContent = score;
  roundText.textContent = currentRound;
};

target.addEventListener("click", () => {
  if (!time) return;
  const diff = new Date().getTime() - time;
  const roundScore = maxRoundScore - diff;
  score += roundScore > 0 ? roundScore : 0;
  currentRound++;

  updateGameInfo();

  if (currentRound >= maxRound) {
    window.alert(`Finished! Score: ${score}`);
    target.style.display = "none";
  } else {
    moveTarget(containerWidth - targetWidth, containerHeight - targetHeight);
  }
});

startBtn.addEventListener("click", () => {
  currentRound = 1;
  score = 0;
  target.style.display = "block";
  updateGameInfo();
  moveTarget();
});
