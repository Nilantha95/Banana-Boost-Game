



document.addEventListener('DOMContentLoaded', function() {
    
    const firebaseConfig = {
        apiKey: "AIzaSyBtgxxTMjm8OXclSEvZTsWbfESD3HyiRNw",
        authDomain: "new-fruit-game-6c439.firebaseapp.com",
        projectId: "new-fruit-game-6c439",
        storageBucket: "new-fruit-game-6c439.firebasestorage.app",
        messagingSenderId: "551515552268",
        appId: "1:551515552268:web:5a65177cd66989fb0f0c29"
    };

    
    firebase.initializeApp(firebaseConfig);

    // Get a reference to the auth and firestore services
    const auth = firebase.auth();
    const db = firebase.firestore();

    const headingCharacters = document.querySelectorAll('.heading-character');
    const animationDelay = 150;

    headingCharacters.forEach((char, index) => {
        setTimeout(() => {
            char.classList.add('visible');
        }, index * animationDelay);
    });

    const emailSpan = document.getElementById('email');
    const nicknameSpan = document.getElementById('nickname');
    const highestScoreSpan = document.getElementById('highestScore');
    const totalScoreSpan = document.getElementById('totalScore');
    const editNicknameButton = document.getElementById('editNickname');
    const nicknameInput = document.getElementById('nicknameInput');
    const saveNicknameButton = document.getElementById('saveNickname');
    const backButton = document.querySelector('.back-button');
    const playAgainButton = document.querySelector('.play-again-button');

    auth.onAuthStateChanged(user => {
        if (user) {
            emailSpan.textContent = user.email;
            db.collection('players').doc(user.uid).get().then(doc => {
                if (doc.exists) {
                    const data = doc.data();
                    nicknameSpan.textContent = data.nickname || 'No Nickname';
                    highestScoreSpan.textContent = data.highScore || 0;
                    totalScoreSpan.textContent = data.score || 0;
                } else {
                    nicknameSpan.textContent = 'No Data';
                    highestScoreSpan.textContent = '0';
                    totalScoreSpan.textContent = '0';
                }
            }).catch(error => {
                console.error("Error getting document:", error);
                nicknameSpan.textContent = 'Error loading';
                highestScoreSpan.textContent = 'Error loading';
                totalScoreSpan.textContent = 'Error loading';
            });
        } else {
            window.location.href = "SignIn.html";
        }
    });

    editNicknameButton.addEventListener('click', function() {
        nicknameSpan.style.display = 'none';
        editNicknameButton.style.display = 'none';
        nicknameInput.style.display = 'inline-block';
        saveNicknameButton.style.display = 'inline-block';
        nicknameInput.value = nicknameSpan.textContent;
    });

    saveNicknameButton.addEventListener('click', function() {
        const user = auth.currentUser;
        if (user) {
            db.collection('players').doc(user.uid).update({
                nickname: nicknameInput.value
            }).then(() => {
                nicknameSpan.textContent = nicknameInput.value;
                nicknameSpan.style.display = 'inline-block';
                editNicknameButton.style.display = 'inline-block';
                nicknameInput.style.display = 'none';
                saveNicknameButton.style.display = 'none';
            }).catch(error => {
                console.error("Error updating nickname:", error);
                alert("Failed to update nickname.");
            });
        }
    });

    backButton.addEventListener('click', function() {
        window.location.href = 'GameInterface.html';
    });

    playAgainButton.addEventListener('click', function() {
        window.location.href = 'StartGame.html';
    });
});