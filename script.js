let scores = JSON.parse(localStorage.getItem('scores')) || { wins: 0, losses: 0, ties: 0 };
let isAutoPlaying = false;
let intervalId;

// Initialize display
updateScoreElement();

function toggleAutoPlay() {
    const btn = document.getElementById('auto-btn');
    if (!isAutoPlaying) {
        intervalId = setInterval(() => {
            const move = ['Rock', 'Paper', 'Scissors'][Math.floor(Math.random() * 3)];
            playGame(move);
        }, 1000);
        isAutoPlaying = true;
        btn.innerText = "Stop Auto";
        btn.style.background = "#ff9966";
    } else {
        clearInterval(intervalId);
        isAutoPlaying = false;
        btn.innerText = "Auto Play";
        btn.style.background = "#4ca1af";
    }
}

function playGame(playerMove) {
    const computerMove = ['Rock', 'Paper', 'Scissors'][Math.floor(Math.random() * 3)];
    let result = '';

    if (playerMove === computerMove) {
        result = 'Tie';
    } else if (
        (playerMove === 'Rock' && computerMove === 'Scissors') ||
        (playerMove === 'Paper' && computerMove === 'Rock') ||
        (playerMove === 'Scissors' && computerMove === 'Paper')
    ) {
        result = 'You Win';
    } else {
        result = 'You Lose';
    }

    if (result === 'You Win') scores.wins++;
    else if (result === 'You Lose') scores.losses++;
    else scores.ties++;

    localStorage.setItem('scores', JSON.stringify(scores));
    updateScoreElement();
    showResult(result, playerMove, computerMove);
}

function showResult(result, player, computer) {
    const resEl = document.getElementById('result-text');
    resEl.innerText = result;
    resEl.classList.remove('pop');
    void resEl.offsetWidth; // Trigger reflow for animation
    resEl.classList.add('pop');

    document.getElementById('move-details').innerHTML =
        `You <i class="fas fa-hand-${player.toLowerCase()}"></i> vs <i class="fas fa-hand-${computer.toLowerCase()}"></i> Computer`;
}

function updateScoreElement() {
    document.getElementById('wins').innerText = scores.wins;
    document.getElementById('losses').innerText = scores.losses;
    document.getElementById('ties').innerText = scores.ties;
}

function resetGame() {
    scores = { wins: 0, losses: 0, ties: 0 };
    localStorage.clear();
    updateScoreElement();
    document.getElementById('result-text').innerText = "Choose your move!";
    document.getElementById('move-details').innerText = "Score Reset.";
}