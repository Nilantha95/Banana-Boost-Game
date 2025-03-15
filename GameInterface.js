// Get references to DOM elements
const musicButton = document.getElementById('musicButton');
const backgroundMusic = document.getElementById('backgroundMusic');
const quitButton = document.querySelector('.quit-button');

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
    
    // Toggle the music state
    isMusicPlaying = !isMusicPlaying;
});

// Add click event listener to quit button
quitButton.addEventListener('click', function() {
    // Navigate to the signin page
    window.location.href = 'signin.html';
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
    
    // Make sure the quit button has the event listener (in case DOM loads after the earlier code)
    if (quitButton) {
        quitButton.addEventListener('click', function() {
            window.location.href = 'SignIn.html';
        });
    }
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
});