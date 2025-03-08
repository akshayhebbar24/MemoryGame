let moves = 0, timer, timeElapsed = 0, flippedCards = [], matchedCards = [], difficulty;

const items = [
  { name: "bee", image: "bee.png" },
  { name: "crocodile", image: "crocodile.png" },
  { name: "macaw", image: "macaw.png" },
  { name: "gorilla", image: "gorilla.png" },
  { name: "tiger", image: "tiger.png" },
  { name: "monkey", image: "monkey.png" },
  { name: "chameleon", image: "chameleon.png" },
  { name: "piranha", image: "piranha.png" },
  { name: "anaconda", image: "anaconda.png" },
  { name: "sloth", image: "sloth.png" },
  { name: "cockatoo", image: "cockatoo.png" },
  { name: "toucan", image: "toucan.png" },
];

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

  // Hide difficulty selection and show game stats
  document.getElementById("difficulty-selection").style.display = "none";
  document.getElementById("game-stats").style.display = "block";

  timer = setInterval(() => {
    timeElapsed++;
    document.getElementById("timer").innerText = timeElapsed;
  }, 1000);
}

function stopGame() {
  clearInterval(timer);
  alert(`Game stopped! Time: ${timeElapsed} seconds, Moves: ${moves}`);
  resetGame();
}

function resetGame() {
  clearInterval(timer);
  document.getElementById("difficulty-selection").style.display = "block";
  document.getElementById("game-stats").style.display = "none";
  document.getElementById("game-board").innerHTML = "";
}

function setupBoard(numPairs) {
  const gameBoard = document.getElementById("game-board");
  gameBoard.innerHTML = "";
  const gridSize = Math.sqrt(numPairs * 2);
  gameBoard.style.gridTemplateColumns = `repeat(${gridSize}, 100px)`;
  const selectedItems = items.slice(0, numPairs);
  const deck = [...selectedItems, ...selectedItems].sort(() => Math.random() - 0.5);

  deck.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.value = item.name;
    card.innerHTML = `
      <div class="card-front">?</div>
      <div class="card-back">
        <img src="${item.image}" alt="${item.name}" />
      </div>
    `;
    card.addEventListener("click", flipCard);
    gameBoard.appendChild(card);
  });
}

function flipCard() {
  if (flippedCards.length >= 2 || this.classList.contains("flipped")) return;
  this.classList.add("flipped");
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
      resetGame();
    }
  } else {
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      flippedCards = [];
    }, 1000);
  }
}