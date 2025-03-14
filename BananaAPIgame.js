document.addEventListener('DOMContentLoaded', function() {
    const puzzleImage = document.getElementById('puzzle-image');
    const quizText = document.getElementById('quiz-text');
    const answerInput = document.getElementById('answer-input');
    const checkButton = document.getElementById('check-button');
    const feedback = document.getElementById('feedback');
    const nextButton = document.getElementById('next-button');
    const timerDisplay = document.getElementById('timer');
    const backButton = document.getElementById('back-button');

    let correctSolution;
    let timeLeft;
    let timerInterval;

    function fetchPuzzle() {
        fetch('https://marcconrad.com/uob/banana/api.php')
            .then(response => response.json())
            .then(data => {
                if (data.question && data.solution) {
                    correctSolution = parseInt(data.solution);
                    puzzleImage.src = data.question;
                    answerInput.value = '';
                    feedback.textContent = '';
                    startTimer();
                } else {
                    feedback.textContent = 'Invalid puzzle data received.';
                    feedback.style.color = 'red';
                }
            })
            .catch(error => {
                console.error('Error fetching puzzle:', error);
                feedback.textContent = 'Error fetching puzzle.';
                feedback.style.color = 'red';
            });
    }

    function checkAnswer() {
        const userAnswer = parseInt(answerInput.value);
        if (userAnswer === correctSolution) {
            feedback.textContent = 'Correct! 🎉';
            feedback.style.color = 'green';
        } else {
            feedback.textContent = 'Incorrect. Try again!';
            feedback.style.color = 'red';
        }
    }

    function startTimer() {
        timeLeft = 10;
        timerDisplay.textContent = `Time left: ${timeLeft}s`;
        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = `Time left: ${timeLeft}s`;
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                feedback.textContent = "Time's up! Try again.";
                feedback.style.color = 'red';
                fetchPuzzle();
            }
        }, 1000);
    }

    fetchPuzzle();

    checkButton.addEventListener('click', checkAnswer);
    nextButton.addEventListener('click', fetchPuzzle);
    backButton.addEventListener('click', function() {
        window.location.href = 'MainGUI.html';
    });
});