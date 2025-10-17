const Gameboard = (function () {
  const gameboard = [];

  return {};
})();

const gameboard = [];

let gameBoardDiv = document.getElementById("gameBoard");

function displayGameBoard() {
  gameBoardDiv.innerHTML = "";

  for (let i = 0; i < 9; i++) {
    let gridItemButton = document.createElement("button");
    gridItemButton.className = "grid-item";
    gridItemButton.textContent = gameboard[i];

    gridItemButton.addEventListener("click", () => {
      if (gameboard[i] == null) {
        gameboard[i] = "X";
      }

      displayGameBoard();
    });

    gameBoardDiv.appendChild(gridItemButton);
  }
}

displayGameBoard();

function checkForWinner() {
  if (gameboard[0] == "X" && gameboard[1] == "X" && gameboard[3]) {
  }
}
