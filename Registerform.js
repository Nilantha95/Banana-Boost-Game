// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBtgxxTMjm8OXclSEvZTsWbfESD3HyiRNw",
    authDomain: "new-fruit-game-6c439.firebaseapp.com",
    projectId: "new-fruit-game-6c439",
    storageBucket: "new-fruit-game-6c439.firebasestorage.app",
    messagingSenderId: "551515552268",
    appId: "1:551515552268:web:5a65177cd66989fb0f0c29"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the auth and firestore services
const auth = firebase.auth();
const db = firebase.firestore();

document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nickname = document.getElementById('nickname').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const errorMessage = document.getElementById('errorMessage');
            
            // Clear any previous error messages
            errorMessage.textContent = '';
            
            console.log("Attempting to register user:", email, "with nickname:", nickname);

            // Password strength validation
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;
            if (!passwordRegex.test(password)) {
                errorMessage.textContent = "Password must be at least 10 characters long and include uppercase, lowercase, numbers, and special characters.";
                return; // Stop the registration process
            }
            
            // Create user with email and password
            auth.createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // User registered successfully
                    const user = userCredential.user;
                    console.log("User created with ID:", user.uid);
                    
                    // Add user data to Firestore
                    const playerData = {
                        nickname: nickname,
                        email: email,
                    };
                    
                    console.log("Attempting to save player data:", playerData);
                    
                    // Use set with merge option to ensure data is properly saved
                    return db.collection('players').doc(user.uid).set(playerData, { merge: true });
                })
                .then(() => {
                    console.log("User data successfully added to Firestore!");
                    alert('Registration successful!');
                    window.location.href = 'SignIn.html'; // Redirect to game page
                })
                .catch((error) => {
                    // Handle errors
                    console.error("Error during registration:", error);
                    errorMessage.textContent = error.message;
                });
        });
    } else {
        console.error("Register form not found!");
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