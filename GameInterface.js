// Get references to DOM elements
const musicButton = document.getElementById('musicButton');
const backgroundMusic = document.getElementById('backgroundMusic');
const quitButton = document.querySelector('.quit-button');
const leaderboardButton = document.querySelector('.leaderboard-button');
const profileButton = document.querySelector('.about-button');
const playbutton = document.querySelector('.play-button');


// Initialize music state
let isMusicPlaying = false; // Music starts paused

// Set initial button state
musicButton.textContent = 'Play Music';
musicButton.classList.remove('muted');

// Add click event listener to music button
musicButton.addEventListener('click', function() {
    if (isMusicPlaying) {
        // If music is playing, pause it
        backgroundMusic.pause();
        musicButton.textContent = 'Play Music'; // Change button text
        musicButton.classList.remove('muted');
    } else {
        // If music is paused, play it
        backgroundMusic.play()
        .catch(error => {
            console.error('Error playing audio:', error);
        });
        musicButton.textContent = 'Mute Music'; // Change button text
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

// Animate the heading with letters appearing one by one
document.addEventListener('DOMContentLoaded', function() {
    const headingCharacters = document.querySelectorAll('.heading-character');
    const animationDelay = 150; // milliseconds between each character
    
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