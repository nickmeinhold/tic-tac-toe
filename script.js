const Gameboard = (function () {
  let gameboard = Array(9).fill(null);

  function getBoard() {
    return gameboard;
  }

  function reset() {
    gameboard = Array(9).fill(null);
  }

  function makeMove(index, symbol) {
    if (gameboard[index] === null) {
      gameboard[index] = symbol;
      return true;
    }
    return false;
  }

  return {
    getBoard,
    makeMove,
    reset,
  };
})();

let gameBoardDiv = document.getElementById("gameBoard");

function GameController() {
  let gameboard = Gameboard.getBoard();

  function getBoard() {
    return gameboard;
  }

  const players = [
    { name: "player1", symbol: "X" },
    { name: "player2", symbol: "O" },
  ];
  let activePlayer = players[0];
  let turnDiv = document.getElementById("turn");
  // Initialize turn display correctly on the element
  turnDiv.textContent = getActivePlayer().name + "'s turn";
  let gameOver = false;

  function takeTurn() {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
    turnDiv.textContent = getActivePlayer().name + "'s turn";
  }

  function checkForWinner() {
    const s = getActivePlayer().symbol;
    const wins = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (const [a, b, c] of wins) {
      if (gameboard[a] === s && gameboard[b] === s && gameboard[c] === s) {
        turnDiv.textContent = getActivePlayer().name + " is the winner!";
        gameOver = true;
        return true;
      }
    }
    // Draw detection: no empty cells and no winner
    if (gameboard.every((cell) => cell !== null)) {
      turnDiv.textContent = "It's a draw!";
      gameOver = true;
      return true; // treat draw as terminal state
    }
    return false;
  }

  function isGameOver() {
    return gameOver;
  }

  function getActivePlayer() {
    return activePlayer;
  }

  function resetGame() {
    Gameboard.reset();
    gameboard = Gameboard.getBoard();
    activePlayer = players[0];
    gameOver = false;
    turnDiv.textContent = getActivePlayer().name + "'s turn";
  }

  return {
    takeTurn,
    checkForWinner,
    isGameOver,
    getActivePlayer,
    getBoard,
    resetGame,
  };
}

function ScreenController() {
  let gameController = GameController();
  let gameboard = gameController.getBoard();
  const resetBtn = document.getElementById("resetBtn");

  function updateGameBoard() {
    gameBoardDiv.innerHTML = "";

    for (let i = 0; i < 9; i++) {
      let gridItemButton = document.createElement("button");
      gridItemButton.className = "grid-item";
      gridItemButton.textContent = gameboard[i];

      gridItemButton.addEventListener("click", () => {
        if (gameboard[i] == null && !gameController.isGameOver()) {
          gameboard[i] = gameController.getActivePlayer().symbol;

          const won = gameController.checkForWinner();
          if (!won) {
            gameController.takeTurn();
          }

          updateGameBoard();
        }
      });

      gameBoardDiv.appendChild(gridItemButton);
    }
  }

  // Initial render
  updateGameBoard();

  // Reset button wiring
  resetBtn.addEventListener("click", () => {
    gameController.resetGame();
    gameboard = gameController.getBoard();
    updateGameBoard();
  });
}

ScreenController();
