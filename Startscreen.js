let canvas = document.getElementById('gameCanvas');
        let ctx = canvas.getContext('2d');
        let monkey = { x: 350, y: 400, width: 100, height: 100 };
        let bananas = [];
        let score = 0;
        let gameRunning = false;

        // Preload the banana image
        let bananaImage = new Image();
        bananaImage.src="../Images/banana.png"; // Replace with the actual path to your image

        let monkeyImage = new Image();
        monkeyImage.src = '../Images/monkey.png';

        function startGame() {
            gameRunning = true;
            bananas = [];
            score = 0;
            requestAnimationFrame(updateGame);
        }
        
        function updateGame() {
            if (!gameRunning) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(monkeyImage, monkey.x, monkey.y, monkey.width, monkey.height);
            
            if (Math.random() < 0.05) {
                bananas.push({ x: Math.random() * (canvas.width - 30), y: 0, width: 60, height: 60 });
            }
            
            bananas.forEach((banana, index) => {
                banana.y += 5;
                // Draw the banana image instead of the yellow rectangle
                ctx.drawImage(bananaImage, banana.x, banana.y, banana.width, banana.height);
                if (banana.y > canvas.height) bananas.splice(index, 1);
                if (
                    banana.x < monkey.x + monkey.width &&
                    banana.x + banana.width > monkey.x &&
                    banana.y < monkey.y + monkey.height &&
                    banana.y + banana.height > monkey.y
                ) {
                    bananas.splice(index, 1);
                    score++;
                }
            });
            ctx.fillStyle = 'black';
            ctx.fillText('Score: ' + score, 20, 30);
            requestAnimationFrame(updateGame);
        }
        
        document.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowLeft' && monkey.x > 0) monkey.x -= 20;
            if (event.key === 'ArrowRight' && monkey.x < canvas.width - monkey.width) monkey.x += 20;
        });
        
        function toggleMusic() {
            let music = document.getElementById('bgMusic');
            if (music.paused) music.play();
            else music.pause();
        }
        
        function moveMonkey() {
            let monkeyElement = document.querySelector('.monkey');
            let screenWidth = window.innerWidth - 100;
            let screenHeight = window.innerHeight - 100;

            setInterval(() => {
                let randomX = Math.random() * screenWidth;
                let randomY = Math.random() * (screenHeight - 100) + 50;
                monkeyElement.style.left = `${randomX}px`;
                monkeyElement.style.top = `${randomY}px`;
            }, 3000);
        }

        function monkeyJump() {
            let monkeyElement = document.querySelector('.monkey');
            monkeyElement.classList.add('jump');
            setTimeout(() => {
                monkeyElement.classList.remove('jump');
            }, 500);
        }

        window.onload = moveMonkey;