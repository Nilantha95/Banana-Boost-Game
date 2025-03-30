document.addEventListener('DOMContentLoaded', function() {
    // Animation for the heading
    const headingCharacters = document.querySelectorAll('.heading-character');
    const animationDelay = 150; // milliseconds between each character

    headingCharacters.forEach((char, index) => {
        setTimeout(() => {
            char.classList.add('visible');
        }, index * animationDelay);
    });

    // ... (rest of the JavaScript remains the same) ...
    const editNicknameButton = document.getElementById('editNickname');
    const nicknameSpan = document.getElementById('nickname');
    const nicknameInput = document.getElementById('nicknameInput');
    const saveNicknameButton = document.getElementById('saveNickname');

    editNicknameButton.addEventListener('click', function() {
        nicknameSpan.style.display = 'none';
        editNicknameButton.style.display = 'none';
        nicknameInput.style.display = 'inline-block';
        saveNicknameButton.style.display = 'inline-block';
        nicknameInput.value = nicknameSpan.textContent;
    });

    saveNicknameButton.addEventListener('click', function() {
        nicknameSpan.textContent = nicknameInput.value;
        nicknameSpan.style.display = 'inline-block';
        editNicknameButton.style.display = 'inline-block';
        nicknameInput.style.display = 'none';
        saveNicknameButton.style.display = 'none';
    });

    const backButton = document.querySelector('.back-button');
    const playAgainButton = document.querySelector('.play-again-button');

    backButton.addEventListener('click', function() {
        window.location.href = 'GameInterface.html';
    });

    playAgainButton.addEventListener('click', function() {
        window.location.href = 'game.html';
    });
    const backgroundMusic = document.getElementById('backgroundMusic');
});