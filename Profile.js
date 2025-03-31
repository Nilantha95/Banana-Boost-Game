document.addEventListener('DOMContentLoaded', function() {
    
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

    // Animation for the heading
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
    const backgroundMusic = document.getElementById('backgroundMusic');
    const profileImage = document.getElementById('profileImage');
    const uploadButton = document.getElementById('uploadButton');
    const imageUpload = document.getElementById('imageUpload');

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