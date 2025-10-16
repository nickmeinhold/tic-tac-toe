const Gameboard = (function () {
  const gameboard = [];

  return {};
})();

let gameBaordDiv = document.getElementById("gameBoard");

for (let i = 0; i < 9; i++) {
  let gridItemButton = document.createElement("button");
  gridItemButton.className = "grid-item";

  gridItemButton.addEventListener("click", () => {
    console.log(i);
  });

  gameBaordDiv.appendChild(gridItemButton);
}
