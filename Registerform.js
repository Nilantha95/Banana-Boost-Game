const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the auth and firestore services
const auth = firebase.auth();
const db = firebase.firestore();

document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nickname = document.getElementById('nickname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
    
    // Create user with email and password
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // User registered successfully
            const user = userCredential.user;
            
            // Add user data to Firestore
            return db.collection('players').doc(user.uid).set({
                nickname: nickname,
                email: email,
                createdAt: new Date(),
                gameStats: {
                    highScore: 0,
                    gamesPlayed: 0,
                    totalBananasCaught: 0
                }
            });
        })
        .then(() => {
            alert('Registration successful!');
            window.location.href = 'game.html'; // Redirect to game page
        })
        .catch((error) => {
            // Handle errors
            errorMessage.textContent = error.message;
            console.error("Error during registration:", error);
        });
});