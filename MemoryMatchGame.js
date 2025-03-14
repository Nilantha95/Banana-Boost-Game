document.addEventListener('DOMContentLoaded', function() {
    const gameBoard = document.getElementById('game-board');
    const movesDisplay = document.getElementById('moves');
    const livesDisplay = document.getElementById('lives');
    const timerDisplay = document.getElementById('timer');
    const startButton = document.getElementById('start-button');
    const backButton = document.getElementById('back-button');
    const gameOverDisplay = document.getElementById('game-over');
    
    let cards = [];
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
    let moves = 0;
    let matches = 0;
    let lives = 3;
    let timeLeft = 60;
    let timerInterval;
    let gameStarted = false;
    const MAX_MOVES = 20;
    
    // Card symbols (emojis)
    const symbols = ['🍎', '🍌', '🍊', '🍇', '🍓', '🍍', '🥝', '🍉'];
    
    // Update lives display
    function updateLivesDisplay() {
        livesDisplay.textContent = '❤️'.repeat(lives);
    }
    
    // Start a new game
    function startGame() {
        resetGame();
        createCards();
        shuffleCards();
        gameStarted = true;
        gameOverDisplay.style.display = 'none';
        
        // Start the timer
        timerInterval = setInterval(function() {
            timeLeft--;
            timerDisplay.textContent = timeLeft;
            
            if (timeLeft <= 0) {
                endGame('Time\'s up!');
            }
        }, 1000);
    }
    
    // Create the cards
    function createCards() {
        // Create pairs of cards
        let cardValues = [...symbols, ...symbols];
        
        for (let i = 0; i < cardValues.length; i++) {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.value = cardValues[i];
            card.addEventListener('click', flipCard);
            
            gameBoard.appendChild(card);
            cards.push(card);
        }
    }
    
    // Shuffle the cards
    function shuffleCards() {
        cards.forEach(card => {
            const randomPos = Math.floor(Math.random() * cards.length);
            card.style.order = randomPos;
        });
    }
    
    // Flip a card
    function flipCard() {
        if (lockBoard || this === firstCard || this.classList.contains('flipped')) return;
        if (!gameStarted) return;
        
        this.classList.add('flipped');
        this.textContent = this.dataset.value;
        
        if (!hasFlippedCard) {
            // First card flipped
            hasFlippedCard = true;
            firstCard = this;
            return;
        }
        
        // Second card flipped
        secondCard = this;
        checkForMatch();
    }
    
    // Check if the two flipped cards match
    function checkForMatch() {
        moves++;
        movesDisplay.textContent = moves;
        
        // Check if max moves reached
        if (moves >= MAX_MOVES) {
            if (matches < symbols.length) {
                // Player loses a life if they didn't match all pairs within move limit
                loseLife();
                return;
            }
        }
        
        let isMatch = firstCard.dataset.value === secondCard.dataset.value;
        
        if (isMatch) {
            disableCards();
            matches++;
            
            if (matches === symbols.length) {
                setTimeout(() => {
                    endGame('Congratulations! You matched all pairs!');
                }, 500);
            }
        } else {
            unflipCards();
        }
    }
    
    // Disable matched cards
    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        
        resetBoard();
    }
    
    // Unflip non-matching cards
    function unflipCards() {
        lockBoard = true;
        
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard.textContent = '';
            secondCard.textContent = '';
            
            resetBoard();
        }, 1000);
    }
    
    // Lose a life
    function loseLife() {
        lives--;
        updateLivesDisplay();
        
        if (lives <= 0) {
            endGame('Out of lives!');
        } else {
            // Reset the current game state but keep the lives
            setTimeout(() => {
                gameBoard.innerHTML = '';
                cards = [];
                moves = 0;
                matches = 0;
                movesDisplay.textContent = moves;
                
                createCards();
                shuffleCards();
            }, 1000);
        }
    }
    
    // Reset the board state
    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }
    
    // End game
    function endGame(message) {
        clearInterval(timerInterval);
        gameStarted = false;
        
        // Display game over message
        gameOverDisplay.textContent = message;
        gameOverDisplay.style.display = 'block';
        
        // If player won, keep the cards visible
        if (message.includes('Congratulations')) {
            // Do nothing, keep cards visible
        } else {
            // If player lost, reset the board after a delay
            setTimeout(() => {
                lockBoard = true;
            }, 500);
        }
    }
    
    // Reset the game
    function resetGame() {
        clearInterval(timerInterval);
        gameBoard.innerHTML = '';
        cards = [];
        moves = 0;
        matches = 0;
        lives = 3;
        timeLeft = 60;
        gameStarted = false;
        
        movesDisplay.textContent = moves;
        updateLivesDisplay();
        timerDisplay.textContent = timeLeft;
        
        resetBoard();
    }
    
    // Event listeners
    startButton.addEventListener('click', startGame);
    backButton.addEventListener('click', function() {
        window.location.href = 'MainGUI.html';
    });
    
    // Initialize the game
    startGame();
});