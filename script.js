let moves = 0, timer, timeElapsed = 0, flippedCards = [], matchedCards = [], difficulty;

function startGame() {
    clearInterval(timer);
    moves = 0;
    timeElapsed = 0;
    flippedCards = [];
    matchedCards = [];
    document.getElementById("moves").innerText = moves;
    document.getElementById("timer").innerText = timeElapsed;
    difficulty = parseInt(document.querySelector('input[name="difficulty"]:checked').value);
    setupBoard(difficulty);
    timer = setInterval(() => {
        timeElapsed++;
        document.getElementById("timer").innerText = timeElapsed;
    }, 1000);
}

function setupBoard(numPairs) {
    const gameBoard = document.getElementById("game-board");
    gameBoard.innerHTML = "";
    gameBoard.style.gridTemplateColumns = `repeat(${Math.sqrt(numPairs * 2)}, 100px)`;
    const symbols = Array.from({ length: numPairs }, (_, i) => i + 1);
    const deck = [...symbols, ...symbols].sort(() => Math.random() - 0.5);
    
    deck.forEach(symbol => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.value = symbol;
        card.addEventListener("click", flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (flippedCards.length >= 2 || this.classList.contains("flipped")) return;
    this.classList.add("flipped");
    this.innerText = this.dataset.value;
    flippedCards.push(this);
    if (flippedCards.length === 2) checkMatch();
}

function checkMatch() {
    moves++;
    document.getElementById("moves").innerText = moves;
    const [card1, card2] = flippedCards;
    if (card1.dataset.value === card2.dataset.value) {
        matchedCards.push(card1, card2);
        flippedCards = [];
        if (matchedCards.length === difficulty * 2) {
            clearInterval(timer);
            alert(`You won! Time: ${timeElapsed} seconds, Moves: ${moves}`);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
            card1.innerText = "";
            card2.innerText = "";
            flippedCards = [];
        }, 1000);
    }
}