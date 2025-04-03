
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
            
            
            errorMessage.textContent = '';
            
            console.log("Attempting to register user:", email, "with nickname:", nickname);

            // Password strength validation process
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;
            if (!passwordRegex.test(password)) {
                errorMessage.textContent = "Password must be at least 10 characters long and include uppercase, lowercase, numbers, and special characters.";
                return;
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
                    
                    
                    return db.collection('players').doc(user.uid).set(playerData, { merge: true });
                })
                .then(() => {
                    console.log("User data successfully added to Firestore!");
                    alert('Registration successful!');
                    window.location.href = 'SignIn.html';
                })
                .catch((error) => {
                    
                    console.error("Error during registration:", error);
                    errorMessage.textContent = error.message;
                });
        });
    } else {
        console.error("Register form not found!");
    }
});


document.addEventListener('DOMContentLoaded', function() {
    const headingCharacters = document.querySelectorAll('.heading-character');
    const animationDelay = 150;

    headingCharacters.forEach((char, index) => {
        setTimeout(() => {
            char.classList.add('visible');
        }, index * animationDelay);
    });
});