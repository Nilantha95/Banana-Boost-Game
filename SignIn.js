// Used Youtube videos to set google signin (https://www.youtube.com/watch?v=Uhbn1KmiNbg) and LLM to get some code parts.


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
    
    const signInForm = document.querySelector('form');
    
    
    const errorDiv = document.createElement('div');
    errorDiv.id = 'errorMessage';
    errorDiv.style.color = 'red';
    errorDiv.style.marginTop = '10px';
    signInForm.appendChild(errorDiv);
    
    // Add submit event listener to the form submit
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
                window.location.href = 'GameInterface.html';
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

    // Google Sign-In
const googleSignInButton = document.getElementById('googleSignIn');
googleSignInButton.addEventListener('click', function() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then((result) => {
            // Signed in with Google successfully.
            const user = result.user;
            console.log("User signed in with Google:", user.uid);

            
            db.collection('players').doc(user.uid).set({
                email: user.email,
                nickname: user.displayName,
            }, { merge: true }) 
            .then(() => {
                console.log("User document created/updated in Firestore.");
                window.location.href = 'GameInterface.html';
            })
            .catch((error) => {
                console.error("Error creating/updating user document:", error);
                const errorMessage = document.getElementById('errorMessage');
                errorMessage.textContent = "Error saving user data. Please try again.";
            });
        })
        .catch((error) => {
            
            const errorMessage = document.getElementById('errorMessage');
            errorMessage.textContent = error.message;
            console.error("Error during Google sign in:", error);
        });
});
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