const board = document.getElementById("game-board");
const restartBtn = document.getElementById("restart");

let cards = ["🍎","🍎","🍌","🍌","🍇","🍇","🍒","🍒"];
let flippedCards = [];
let matchedCards = [];

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function createBoard() {
  board.innerHTML = "";
  matchedCards = [];
  flippedCards = [];
  shuffle(cards).forEach(symbol => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.symbol = symbol;
    card.textContent = "?";
    card.addEventListener("click", flipCard);
    board.appendChild(card);
  });
}

function flipCard(e) {
  const card = e.target;
  if (flippedCards.length < 2 && !card.classList.contains("flipped")) {
    card.classList.add("flipped");
    card.textContent = card.dataset.symbol;
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      checkMatch();
    }
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  if (card1.dataset.symbol === card2.dataset.symbol) {
    matchedCards.push(card1, card2);
    flippedCards = [];
    if (matchedCards.length === cards.length) {
      setTimeout(() => alert("🎉 You won!"), 500);
    }
  } else {
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      card1.textContent = "?";
      card2.textContent = "?";
      flippedCards = [];
    }, 1000);
  }
}

restartBtn.addEventListener("click", createBoard);

createBoard();
