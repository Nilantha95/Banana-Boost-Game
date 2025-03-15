// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBdPV7jw9_AHGoTrKd2l1H5H_hMlyYIftw",
    authDomain: "fruit-game-e8918.firebaseapp.com",
    projectId: "fruit-game-e8918",
    storageBucket: "fruit-game-e8918.firebasestorage.app",
    messagingSenderId: "536978157706",
    appId: "1:536978157706:web:1b63e3a0ebce0a243d3d73"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the auth service
const auth = firebase.auth();

document.addEventListener('DOMContentLoaded', function() {
    // Get the form element
    const signInForm = document.querySelector('form');
    
    // Add error message element
    const errorDiv = document.createElement('div');
    errorDiv.id = 'errorMessage';
    errorDiv.style.color = 'red';
    errorDiv.style.marginTop = '10px';
    signInForm.appendChild(errorDiv);
    
    // Add submit event listener to the form
    signInForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get user inputs
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const errorMessage = document.getElementById('errorMessage');
        
        // Clear previous error messages
        errorMessage.textContent = '';
        
        // Sign in with email and password
        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in successfully
                const user = userCredential.user;
                console.log("User signed in:", user.uid);
                
                // Redirect to the game page
                window.location.href = 'game.html';
            })
            .catch((error) => {
                // Handle errors
                const errorCode = error.code;
                const errorMessage = document.getElementById('errorMessage');
                
                console.error("Error during sign in:", error);
                
                // Display user-friendly error messages
                switch(errorCode) {
                    case 'auth/wrong-password':
                        errorMessage.textContent = 'Incorrect password. Please try again.';
                        break;
                    case 'auth/user-not-found':
                        errorMessage.textContent = 'No account found with this email. Please register first.';
                        break;
                    case 'auth/invalid-email':
                        errorMessage.textContent = 'Invalid email format.';
                        break;
                    case 'auth/too-many-requests':
                        errorMessage.textContent = 'Too many failed login attempts. Please try again later.';
                        break;
                    default:
                        errorMessage.textContent = error.message;
                }
            });
    });
});