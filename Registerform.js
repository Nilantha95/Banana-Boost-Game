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