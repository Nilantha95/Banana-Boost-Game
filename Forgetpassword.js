// Firebase configuration for get database connectivity
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
const forgotPasswordForm = document.getElementById('forgotPasswordForm');
const messageDiv = document.getElementById('message');

forgotPasswordForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;

    auth.sendPasswordResetEmail(email)
        .then(() => {
            messageDiv.className = 'message success-message';
            messageDiv.textContent = 'Password reset email sent. Please check your inbox.';
        })
        .catch((error) => {
            messageDiv.className = 'message error-message';
            messageDiv.textContent = error.message;
        });
});

// Heading animation part
const headingCharacters = document.querySelectorAll('.heading-character');
const animationDelay = 150;

headingCharacters.forEach((char, index) => {
    setTimeout(() => {
        char.classList.add('visible');
    }, index * animationDelay);
});