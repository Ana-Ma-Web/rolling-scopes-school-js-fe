import finishGame from "../finishGame";
import countClosestMines from "../helpers.js/countClosestMines";
import soundAudio from "../soundAudio";

const openCell = (x, y, fieldArray, fieldSize) => {
  const count = countClosestMines(x, y, fieldArray, fieldSize);
  const curCell = document.querySelector(`[data-ij="${x}-${y}"]`);
  const size = +fieldSize.slice(-2);

  curCell.classList.add("cell_open");
  curCell.innerHTML = count > 0 ? count : "";
  curCell.dataset.num = count;

  if (!count) {
    for (let i = x - 1; i <= x + 1; i++) {
      for (let j = y - 1; j <= y + 1; j++) {
        if (i >= 0 && j >= 0 && i < size && j < size) {
          const foundCell = document.querySelector(`[data-ij="${i}-${j}"]`);
          if (!foundCell.classList.contains("cell_open")) {
            openCell(i, j, fieldArray, fieldSize);
          }
        }
      }
    }
  }
};

const cellHandler = (ij, fieldArray, fieldSize) => {
  const ijArr = ij.split("-");
  const x = +ijArr[0];
  const y = +ijArr[1];

  if (fieldArray[x][y].isMine) {
    soundAudio("expl");
    finishGame();
  } else {
    const curCell = document.querySelector(`[data-ij="${x}-${y}"]`);

    if (!curCell.classList.contains("cell_open")) {
      soundAudio(false);

      openCell(x, y, fieldArray, fieldSize);
    }
  }
};

export default cellHandler;
