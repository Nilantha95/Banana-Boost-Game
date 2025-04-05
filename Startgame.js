
const firebaseConfig = {
    apiKey: "AIzaSyBtgxxTMjm8OXclSEvZTsWbfESD3HyiRNw",
    authDomain: "new-fruit-game-6c439.firebaseapp.com",
    projectId: "new-fruit-game-6c439",
    storageBucket: "new-fruit-game-6c439.firebasestorage.app",
    messagingSenderId: "551515552268",
    appId: "1:551515552268:web:5a65177cd66989fb0f0c29"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

// Used LLM to bug fix and do code enhancement.

let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');
let monkey = { x: 350, y: 400, width: 100, height: 100 };
let bananas = [];
let score = 0;
let totalScore = 0;
let gameRunning = false;
let lives = 3;
let timer;
let timeRemaining = 15;
const heartSymbol = "❤️";
let playerName = "Player 1";
let currentRound = 1;
let bananaSpeed = 5;
let bananaSpawnRate = 0.05;
let inactivityTimer;           // Timer to track inactivity 10 seconds

const rounds = [
    { time: 20, target: 50, speed: 5, spawnRate: 0.05 },
    { time: 15, target: 70, speed: 7, spawnRate: 0.07 },
    { time: 10, target: 100, speed: 9, spawnRate: 0.09 }
];

let bananaImage = new Image();
let monkeyImage = new Image();

window.onload = function() {
    bananaImage.src = "Images_new/banana.png";
    monkeyImage.src = 'Images_new/monkey.png';
    updateLivesDisplay();
    updateScoreDisplay();
    updateRoundDisplay();
    let music = document.getElementById('bgMusic');
    let musicButton = document.querySelector('.mute-btn');
    if (music.paused) {
        musicButton.textContent = "Play Music";
    } else {
        musicButton.textContent = "Mute Music";
    }
    auth.onAuthStateChanged((user) => {
        updatePlayerName(user);
    });
};

function getLivesFromStorage() {
    let storedLives = localStorage.getItem('playerLives');
    return storedLives === null ? 3 : parseInt(storedLives);
}

function saveLivesToStorage(lives) {
    localStorage.setItem('playerLives', lives.toString());
}

function startGame() {
    const user = auth.currentUser;
    if (!user) {
        alert("Please Sign In to play the game");
        window.location.href = "SignIn.html";
        return;
    }
    if (timer) clearInterval(timer);
    clearTimeout(inactivityTimer);

    gameRunning = true;
    bananas = [];
    score = 0;

    if (lives <= 0) {
        window.location.href = "BananaAPIgame.html";
        return;
    }

    const roundSettings = rounds[currentRound - 1];
    timeRemaining = roundSettings.time;
    bananaSpeed = roundSettings.speed;
    bananaSpawnRate = roundSettings.spawnRate;

    updateScoreDisplay();
    updateLivesDisplay();
    updateRoundDisplay();
    startTimer();
    requestAnimationFrame(updateGame);

    startInactivityTimer();
}


//  Get help from stackoverflow and LLM to develop the code and update.


// Inactivity Timer - 10 seconds
function startInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
        if (gameRunning) {
            alert("Inactivity detected. Logging out.");
            auth.signOut().then(() => {
                window.location.href = "SignIn.html";
            });
        }
    }, 10000); // 10 seconds timer
}

function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    if (gameRunning) {
        startInactivityTimer();
    }
}

// Used YouTube (https://www.youtube.com/watch?v=NSnbUfG3_NY) to learn how to save score to Firestore and LLM to debug.

function saveScoreToFirestore(userId, gameScore) {
    if (!userId) {
        console.error("User ID is undefined. Cannot save score.");
        return;
    }

    db.collection('players').doc(userId).get().then((doc) => {
        if (doc.exists) {
            const currentHighScore = doc.data().highScore || 0;
            const previousScore = doc.data().score || 0;

            const updatedScore = previousScore + gameScore;

            db.collection('players').doc(userId).update({
                score: updatedScore,
            }).then(() => {
                console.log("Accumulated score updated!");
            }).catch((error) => {
                console.error("Error updating accumulated score:", error);
            });

            if (gameScore > currentHighScore) {
                db.collection('players').doc(userId).update({
                    highScore: gameScore,
                }).then(() => {
                    console.log("High score successfully updated!");
                }).catch((error) => {
                    console.error("Error updating high score:", error);
                });
            }
        } else {
            db.collection('players').doc(userId).set({
                score: gameScore,
                highScore: gameScore,
                email: auth.currentUser.email,
                nickname: auth.currentUser.displayName,
            }).then(() => {
                console.log("Scores successfully set for new player!");
            }).catch((error) => {
                console.error("Error setting scores for new player:", error);
            });
        }
    }).catch((error) => {
        console.error("Error getting document:", error);
    });
}
function updateRoundDisplay() {
    document.getElementById('roundNumber').textContent = currentRound;
    document.getElementById('targetScore').textContent = rounds[currentRound - 1].target;
}

function updateGame() {
    if (!gameRunning) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(monkeyImage, monkey.x, monkey.y, monkey.width, monkey.height);

    if (Math.random() < bananaSpawnRate) {
        bananas.push({ x: Math.random() * (canvas.width - 30), y: 0, width: 60, height: 60 });
    }

    bananas.forEach((banana, index) => {
        banana.y += bananaSpeed;
        ctx.drawImage(bananaImage, banana.x, banana.y, banana.width, banana.height);

        if (banana.y > canvas.height) {
            bananas.splice(index, 1);
            return;
        }

        if (
            banana.x < monkey.x + monkey.width &&
            banana.x + banana.width > monkey.x &&
            banana.y < monkey.y + monkey.height &&
            banana.y + banana.height > monkey.y
        ) {
            bananas.splice(index, 1);
            score++;
            totalScore++;
            updateScoreDisplay();
        }
    });

    ctx.fillStyle = 'black';
    ctx.font = '24px Arial';
    ctx.fillText('Time: ' + timeRemaining, 20, 30);
    ctx.fillText('Round: ' + currentRound + '/3', 20, 60);
    ctx.fillText('Target: ' + rounds[currentRound - 1].target, 20, 90);
    ctx.fillText('Current: ' + score, 20, 120);
    ctx.fillText('Total: ' + totalScore, 20, 150);

    if (gameRunning) {
        requestAnimationFrame(updateGame);
    }
}

function startTimer() {
    if (timer) clearInterval(timer);

    const roundSettings = rounds[currentRound - 1];
    timeRemaining = roundSettings.time;

    timer = setInterval(() => {
        timeRemaining--;

        if (timeRemaining <= 0) {
            clearInterval(timer);
            gameRunning = false;

            const targetScore = rounds[currentRound - 1].target;

            if (totalScore < targetScore) {
                loseLife();

                if (lives > 0) {
                    displayMessage(`Time's up! Target not met. -1 Life`, 2000, () => {
                        startGame();
                    });
                } else {
                    displayMessage('GAME OVER!', 2000, () => {
                        alert("Game Over!");
                        window.location.href = "BananaAPIgame.html";
                    });
                }
            } else {
                const user = auth.currentUser;
                if (currentRound < 3) {
                    currentRound++;
                    displayMessage(`Round ${currentRound-1} Complete!`, 2000, () => {
                        startGame();
                    });
                } else {
                    if (user){
                        saveScoreToFirestore(user.uid, totalScore);
                    }
                    displayMessage('Congratulations! You Win!', 2000, () => {
                        alert("You've completed all rounds! Final score: " + totalScore);
                        window.location.href = "GameInterface.html";
                    });
                }
            }
        }
    }, 1000);
}

function displayMessage(message, duration, callback) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = '36px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(message, canvas.width/2, canvas.height/2);
    ctx.textAlign = 'start';

    if (callback) {
        setTimeout(callback, duration);
    }
}

function loseLife() {
    lives--;
    saveLivesToStorage(lives);
    updateLivesDisplay();

    if (lives <= 0) {
        displayMessage("Game Over! Go to Math Game to recharge lives.", 3000, () => {
            window.location.href = "BananaAPIgame.html";
        });
    }
}

function updateLivesDisplay() {
    lives = getLivesFromStorage();
    const livesDisplay = document.getElementById('lives');
    livesDisplay.innerHTML = '';
    livesDisplay.textContent = heartSymbol.repeat(lives);
}

// High Score Display
function updateScoreDisplay() {
    document.getElementById('userScore').textContent = totalScore;
    const user = auth.currentUser;
    if (user) {
        db.collection('players').doc(user.uid).get().then((doc) => {
            if (doc.exists) {
                const highScore = doc.data().highScore || 0;
                document.getElementById('highScoreDisplay').textContent = highScore;
            } else {
                document.getElementById('highScoreDisplay').textContent = "0";
            }
        }).catch((error) => {
            console.error("Error getting high score:", error);
            document.getElementById('highScoreDisplay').textContent = "Error";
        });
    } else {
        document.getElementById('highScoreDisplay').textContent = "Login to see";
    }
}

document.addEventListener('keydown', (event) => {
    if (!gameRunning) return;

    if (event.key === 'ArrowLeft' && monkey.x > 0) monkey.x -= 20;
    if (event.key === 'ArrowRight' && monkey.x < canvas.width - monkey.width) monkey.x += 20;
    resetInactivityTimer();
});

function toggleMusic() {
    let music = document.getElementById('bgMusic');
    let musicButton = document.querySelector('.mute-btn');

    if (music.paused) {
        music.play();
        musicButton.textContent = "Mute Music";
    } else {
        music.pause();
        musicButton.textContent = "Play Music";
    }
}

function navigateToMathGame() {
    const user = auth.currentUser;
    if (user){
        saveScoreToFirestore(user.uid, totalScore);
    }
    window.location.href = "BananaAPIgame.html";
}

function navigateToMain() {
    window.location.href = "GameInterface.html";
}

document.addEventListener('DOMContentLoaded', function() {
    const headingCharacters = document.querySelectorAll('.heading-character');
    const animationDelay = 150;

    headingCharacters.forEach((char, index) => {
        setTimeout(() => {
            char.classList.add('visible');
        }, index * animationDelay);
    });
});

function updatePlayerName(user) {
    if (user) {
        db.collection('players').doc(user.uid).get().then((doc) => {
            if (doc.exists) {
                const nickname = doc.data().nickname || user.displayName || "Player";
                document.getElementById('playerName').textContent = `Name: ${nickname}`;
            } else {
                document.getElementById('playerName').textContent = `Name: ${user.displayName || "Player"}`;
            }
        }).catch((error) => {
            console.error("Error getting player nickname:", error);
            document.getElementById('playerName').textContent = `Name: ${user.displayName || "Player"}`;
        });
    } else {
        document.getElementById('playerName').textContent = "Name: Guest";
    }
}
document.addEventListener('mousemove', resetInactivityTimer);
document.addEventListener('click', resetInactivityTimer);