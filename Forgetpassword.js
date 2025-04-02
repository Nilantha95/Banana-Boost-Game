// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBtgxxTMjm8OXclSEvZTsWbfESD3HyiRNw", // Replace with your actual API Key
    authDomain: "new-fruit-game-6c439.firebaseapp.com", // Replace with your actual Auth Domain
    projectId: "new-fruit-game-6c439", // Replace with your actual Project ID
    storageBucket: "new-fruit-game-6c439.firebasestorage.app", // Replace with your actual Storage Bucket
    messagingSenderId: "551515552268", // Replace with your actual Messaging Sender ID
    appId: "1:551515552268:web:5a65177cd66989fb0f0c29"  // Replace with your actual App ID
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the auth service
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

// Animate the heading with letters appearing one by one
const headingCharacters = document.querySelectorAll('.heading-character');
const animationDelay = 150; // milliseconds between each character

headingCharacters.forEach((char, index) => {
    setTimeout(() => {
        char.classList.add('visible');
    }, index * animationDelay);
});