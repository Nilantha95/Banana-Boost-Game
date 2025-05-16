// Used stackoverflow to get the code for interface button integration and LLM to get some codes.


const musicButton = document.getElementById('musicButton');
const backgroundMusic = ocument.getElementById('backgroundMusic');
const quitButton = document.querySelector('.quit-button');
const leaderboardButton = document.querySelector('.leaderboard-button');
const profileButton = document.querySelector('.about-button');
const playbutton = document.querySelector('.play-button');



let isMusicPlaying = false;


musicButton.textContent = 'Play Music';
musicButton.classList.remove('muted');

// Add click event listener to music button
musicButton.addEventListener('click', function() {
    if (isMusicPlaying) {
        // If music is playing, pause it
        backgroundMusic.pause();
        musicButton.textContent = 'Play Music';
        musicButton.classList.remove('muted');
    } else {
        // If music is playing, running it
        backgroundMusic.play()
        .catch(error => {
            console.error('Error playing audio:', error);
        });
        musicButton.textContent = 'Mute Music';
        musicButton.classList.add('muted');
    }
    
    isMusicPlaying = !isMusicPlaying;
});

leaderboardButton.addEventListener('click', function() {
    window.location.href = 'NewLeaderboard.html';
});

quitButton.addEventListener('click', function() {
    window.location.href = 'SignIn.html';
});


playbutton.addEventListener('click', function() {
    window.location.href = 'Startgame.html';
});

profileButton.addEventListener('click', function() {
    window.location.href = 'Profile.html';
});

//Used Youtube to get the code for the animation and edited.https://www.youtube.com/watch?v=qEcXe51-ZTw
// Animate the heading with letters entering one by one
document.addEventListener('DOMContentLoaded', function() {
    const headingCharacters = document.querySelectorAll('.heading-character');
        const animationDelay = 150;
    
    headingCharacters.forEach((char, index) => {
        setTimeout(() => {
            char.classList.add('visible');
        }, index * animationDelay);
    });
    
    if (quitButton) {
        quitButton.addEventListener('click', function() {
            window.location.href = 'SignIn.html';
        });
    }
});



document.addEventListener('DOMContentLoaded', function() {
    const headingCharacters = document.querySelectorAll('.heading-character');
    const animationDelay = 150;
    headingCharacters.forEach((char, index) => {
        setTimeout(() => {
            char.classList.add('visible');
        }, index * animationDelay);
    });
});