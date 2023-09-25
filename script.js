const game = document.getElementById('game');
const player = document.getElementById('player');
const bot = document.getElementById('bot');
const ball = document.getElementById('ball');
const scoreDisplay = document.getElementById('scoreDisplay');
const levelSelect = document.getElementById('level');

const gameHeight = game.clientHeight;
const playerHeight = player.offsetHeight;
const botHeight = bot.offsetHeight;
const ballDiameter = ball.offsetWidth;
const botSpeeds = [1, 2, 3];  // Velocidades para los niveles 1, 2 y 3

let playerY = gameHeight / 2 - playerHeight / 2;
let botY = gameHeight / 2 - botHeight / 2;
let ballX = 400;
let ballY = 200;
let ballSpeedX = 2;
let ballSpeedY = 1;
let playerScore = 0;
let botScore = 0;
let botSpeed = botSpeeds[2];  // Aumentamos la velocidad del bot

document.addEventListener('mousemove', (e) => {
  playerY = Math.min(gameHeight - playerHeight, Math.max(0, e.clientY - game.offsetTop - playerHeight / 2));
});

function updateGameArea() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Aumentamos la velocidad de la pelota
  ballSpeedX *= 1.001;
  ballSpeedY *= 1.001;

  // Restringimos la velocidad máxima de la pelota
  const maxSpeed = 6;
  ballSpeedX = Math.min(ballSpeedX, maxSpeed);
  ballSpeedY = Math.min(ballSpeedY, maxSpeed);

  // Ball collision with walls
  if (ballY <= 0 || ballY >= gameHeight - ballDiameter) {
    ballSpeedY = -ballSpeedY;
  }

  // Ball collision with player
  if (ballX <= player.offsetWidth && ballY > playerY && ballY < playerY + playerHeight) {
    ballSpeedX = -ballSpeedX;
  }

  // Ball collision with bot
  if (ballX >= game.offsetWidth - bot.offsetWidth - ballDiameter &&
    ballY > botY && ballY < botY + botHeight) {
    ballSpeedX = -ballSpeedX;
  }

  // Ball out of bounds
  if (ballX <= 0 || ballX >= game.offsetWidth - ballDiameter) {
    ballX = 400;
    ballY = 200;
    ballSpeedX = -ballSpeedX;
    playerScore += 1;
    scoreDisplay.innerText = playerScore;
  }

  ball.style.left = ballX + 'px';
  ball.style.top = ballY + 'px';
  player.style.top = playerY + 'px';
  bot.style.top = botY + 'px';

  // Incrementamos la dificultad ajustando el movimiento del bot
  const botSpeedFactor = 0.5;  // Factor de velocidad para el bot
  botY += (ballY - (botY + botHeight / 2)) * botSpeedFactor;

  // Limitamos el movimiento del bot
  botY = Math.max(0, Math.min(gameHeight - botHeight, botY));
}

function changeLevel() {
  const selectedLevel = levelSelect.value;
  botSpeed = botSpeeds[selectedLevel - 1];
}

setInterval(updateGameArea, 10);
