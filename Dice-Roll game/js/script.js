const dice = document.querySelector('.dice');
const rollBtn = document.querySelector('.roll');
const rolledNumberDisplay = document.querySelector('.rolled-number');
const playerTurnDisplay = document.querySelector('.player-turn');
const player1ScoreDisplay = document.querySelector('.player1-score');
const player2ScoreDisplay = document.querySelector('.player2-score');
const startGameBtn = document.getElementById('startGame');
const player1Input = document.getElementById('player1Name');
const player2Input = document.getElementById('player2Name');

let player1 = { name: '', score: 0 };
let player2 = { name: '', score: 0 };
let currentPlayer = player1;

// Start Game Button - Initialize Players
startGameBtn.addEventListener('click', () => {
    player1.name = player1Input.value || 'Player 1';
    player2.name = player2Input.value || 'Player 2';
    
    // Reset scores and display initial turn
    player1.score = player2.score = 0;
    updateScores();
    currentPlayer = player1;
    updateTurnDisplay();

    // Show roll button and hide start game button
    rollBtn.style.display = 'inline-block';
    startGameBtn.style.display = 'none';
});

// Update scores in local storage and display
const updateScores = () => {
    localStorage.setItem('player1Score', player1.score);
    localStorage.setItem('player2Score', player2.score);
    player1ScoreDisplay.textContent = `${player1.name} Score: ${player1.score}`;
    player2ScoreDisplay.textContent = `${player2.name} Score: ${player2.score}`;
};

// Update turn display
const updateTurnDisplay = () => {
    playerTurnDisplay.textContent = `Current Turn: ${currentPlayer.name}`;
};

const randomDice = () => {
    const random = Math.floor(Math.random() * 10);
    if (random >= 1 && random <= 6) {
        rollDice(random);
    } else {
        randomDice();
    }
};

const rollDice = random => {
    dice.style.animation = 'rolling 2s';
    setTimeout(() => {
        // Rotate dice
        switch (random) {
            case 1:
                dice.style.transform = 'rotateX(0deg) rotateY(0deg)';
                break;
            case 6:
                dice.style.transform = 'rotateX(180deg) rotateY(0deg)';
                break;
            case 2:
                dice.style.transform = 'rotateX(-90deg) rotateY(0deg)';
                break;
            case 5:
                dice.style.transform = 'rotateX(90deg) rotateY(0deg)';
                break;
            case 3:
                dice.style.transform = 'rotateX(0deg) rotateY(90deg)';
                break;
            case 4:
                dice.style.transform = 'rotateX(0deg) rotateY(-90deg)';
                break;
            default:
                break;
        }
        dice.style.animation = 'none';
        
        // Display rolled number and add to current player’s score
        rolledNumberDisplay.textContent = `Rolled Number: ${random}`;
        currentPlayer.score += random;
        updateScores();

        // Check for winner
        if (currentPlayer.score >= 30) {
            alert(`${currentPlayer.name} wins!`);
            resetGame();
        } else {
            // Switch to the other player
            currentPlayer = currentPlayer === player1 ? player2 : player1;
            updateTurnDisplay();
        }
    }, 2000);
};

const resetGame = () => {
    // Reset scores, hide roll button, show start button
    player1.score = player2.score = 0;
    updateScores();
    rollBtn.style.display = 'none';
    startGameBtn.style.display = 'inline-block';
    rolledNumberDisplay.textContent = `Rolled Number: -`;
    playerTurnDisplay.textContent = `Game Over! Press Start Game to Play Again.`;
};

// Roll dice when roll button is clicked
rollBtn.addEventListener('click', randomDice);
