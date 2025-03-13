let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');
let monkey = { x: 350, y: 400, width: 100, height: 100 };
let bananas = [];
let score = 0;
let gameRunning = false;
let lives = 3;
let timer;
let timeRemaining = 50;

let bananaImage = new Image();
bananaImage.src = "Images/banana.png";

let monkeyImage = new Image();
monkeyImage.src = 'Images/monkey.png';

function startGame() {
    gameRunning = true;
    bananas = [];
    score = 0;
    timeRemaining = 50;
    updateScoreDisplay();
    startTimer();
    requestAnimationFrame(updateGame);
}

function updateGame() {
    if (!gameRunning) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(monkeyImage, monkey.x, monkey.y, monkey.width, monkey.height);

    if (Math.random() < 0.05) {
        bananas.push({ x: Math.random() * (canvas.width - 30), y: 0, width: 60, height: 60 });
    }

    bananas.forEach((banana, index) => {
        banana.y += 5;
        ctx.drawImage(bananaImage, banana.x, banana.y, banana.width, banana.height);
        if (banana.y > canvas.height) bananas.splice(index, 1);
        if (
            banana.x < monkey.x + monkey.width &&
            banana.x + banana.width > monkey.x &&
            banana.y < monkey.y + monkey.height &&
            banana.y + banana.height > monkey.y
        ) {
            bananas.splice(index, 1);
            score++;
            updateScoreDisplay();
        }
    });

    ctx.fillStyle = 'black';
    ctx.fillText('Time: ' + timeRemaining, 20, 60); // Display timer
    requestAnimationFrame(updateGame);
}

function startTimer() {
    timeRemaining = 10; // Reset the timer here
    timer = setInterval(() => {
        timeRemaining--;
        if (timeRemaining <= 0) {
            clearInterval(timer);
            if (score < 100) {
                loseLife();
            }
            if (lives > 0) {
                startGame();
            } else {
                gameRunning = false;
                alert("Game Over!");
            }
        }
    }, 1000);
}

function loseLife() {
    lives--;
    updateLives();
}

function updateLives() {
    for (let i = 1; i <= 3; i++) {
        let heart = document.getElementById(`heart${i}`);
        heart.style.display = i <= lives ? 'block' : 'none';
    }
}

function updateScoreDisplay() {
    document.getElementById('userScore').textContent = score;
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' && monkey.x > 0) monkey.x -= 20;
    if (event.key === 'ArrowRight' && monkey.x < canvas.width - monkey.width) monkey.x += 20;
});

function toggleMusic() {
    let music = document.getElementById('bgMusic');
    if (music.paused) music.play();
    else music.pause();
}

function moveMonkey() {
    let monkeyElement = document.querySelector('.monkey');
    let screenWidth = window.innerWidth - 100;
    let screenHeight = window.innerHeight - 100;

    setInterval(() => {
        let randomX = Math.random() * screenWidth;
        let randomY = Math.random() * (screenHeight - 100) + 50;
        monkeyElement.style.left = `${randomX}px`;
        monkeyElement.style.top = `${randomY}px`;
    }, 3000);
}

document.addEventListener('DOMContentLoaded', function () {
    const headingCharacters = document.querySelectorAll('.heading-character');
    const animationDelay = 150; // milliseconds between each character

    headingCharacters.forEach((char, index) => {
        setTimeout(() => {
            char.classList.add('visible');
        }, index * animationDelay);
    });
});