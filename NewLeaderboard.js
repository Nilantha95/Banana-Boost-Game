// Animate the heading with letters appearing one by one
document.addEventListener('DOMContentLoaded', function() {
    const headingCharacters = document.querySelectorAll('.heading-character');
    const animationDelay = 150; // milliseconds between each character

    headingCharacters.forEach((char, index) => {
        setTimeout(() => {
            char.classList.add('visible');
        }, index * animationDelay);
    });
    
    // Setup navigation buttons
    const backButton = document.querySelector('.back-button');
    const playAgainButton = document.querySelector('.play-again-button');
    
    if(backButton) {
        backButton.addEventListener('click', function() {
            // Navigate back to main menu
            window.location.href = 'GameInterface.html';
        });
    }
    
    if(playAgainButton) {
        playAgainButton.addEventListener('click', function() {
            // Navigate to game screen
            window.location.href = 'game.html';
        });
    }
    
    // Background music control (optional)
    const backgroundMusic = document.getElementById('backgroundMusic');
    
    // Only if you have a music button on this page
    const musicButton = document.getElementById('musicButton');
    if (musicButton) {
        musicButton.addEventListener('click', function() {
            if (backgroundMusic.paused) {
                backgroundMusic.play();
                musicButton.textContent = 'Mute Music';
                musicButton.classList.add('muted');
            } else {
                backgroundMusic.pause();
                musicButton.textContent = 'Play Music';
                musicButton.classList.remove('muted');
            }
        });
    }
});