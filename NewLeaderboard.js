// Used LLM to get help with get coding parts and Medium (https://medium.com/) to get idea how to develop.


document.addEventListener('DOMContentLoaded', function() {


    // Firebase configuration
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

    // Animate heading
    const headingCharacters = document.querySelectorAll('.heading-character');
    const animationDelay = 150;

    headingCharacters.forEach((char, index) => {
        setTimeout(() => {
            char.classList.add('visible');
        }, index * animationDelay);
    });

    const leaderboardTable = document.querySelector('.leaderboard-table');

    if (leaderboardTable) {
        leaderboardTable.innerHTML = '';
    }

    console.log("Starting Firestore query...");

    db.collection('players').get().then((querySnapshot) => { // get all the documents.
        console.log("Firestore query successful:", querySnapshot);
        let players = [];
        querySnapshot.forEach((doc) => {
            console.log("Document data:", doc.data());
            players.push({
                name: doc.data().name || 'Player',
                score: doc.data().highScore || 0,
                nickname: doc.data().nickname || 'No Nickname' // get nickname from database.
            });
        });

        // sort the players by highscore.
        players.sort((a,b) => b.score - a.score);

        if (leaderboardTable) {
            players.forEach((player, index) => {
                const playerRow = document.createElement('div');
                playerRow.className = 'player-row';

                if (index === 0) playerRow.classList.add('first-place');
                if (index === 1) playerRow.classList.add('second-place');
                if (index === 2) playerRow.classList.add('third-place');

                const medalContainer = document.createElement('div');
                medalContainer.className = 'medal-container';

                if (index === 0) medalContainer.innerHTML = '<div class="medal gold"></div>';
                else if (index === 1) medalContainer.innerHTML = '<div class="medal silver"></div>';
                else if (index === 2) medalContainer.innerHTML = '<div class="medal bronze"></div>';
                else medalContainer.innerHTML = `<div class="rank">${index + 1}</div>`;

                const playerAvatar = document.createElement('div');
                playerAvatar.className = 'player-avatar';

                const playerInfo = document.createElement('div');
                playerInfo.className = 'player-info';
                playerInfo.innerHTML = `<div class="player-name">${player.name}</div><div class="player-nickname">${player.nickname}</div><div class="star-rating"><span class="star filled">★</span><span class="star filled">★</span><span class="star filled">★</span><span class="star filled">★</span><span class="star filled">★</span></div>`;

                const playerScoreDiv = document.createElement('div');
                playerScoreDiv.className = 'player-score';
                playerScoreDiv.textContent = player.score;

                playerRow.appendChild(medalContainer);
                playerRow.appendChild(playerAvatar);
                playerRow.appendChild(playerInfo);
                playerRow.appendChild(playerScoreDiv);

                leaderboardTable.appendChild(playerRow);
            });
        }
    }).catch((error) => {
        console.error("Error fetching leaderboard data:", error);
        console.log("Firestore error details:", error);
    });

    // Setup addEventListener for back and play again buttons
    const backButton = document.querySelector('.back-button');
    const playAgainButton = document.querySelector('.play-again-button');

    if(backButton) {
        backButton.addEventListener('click', function() {
            window.location.href = 'GameInterface.html';
        });
    }

    if(playAgainButton) {
        playAgainButton.addEventListener('click', function() {
            window.location.href = 'StartGame.html';
        });
    }

});