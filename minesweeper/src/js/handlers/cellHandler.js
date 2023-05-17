import finishGame from "../finishGame";
import countClosestMines from "../helpers.js/countClosestMines";
import updateInfoMenu from "../helpers.js/updateInfoMenu";
import soundAudio from "../soundAudio";

const openCell = (x, y, data) => {
  const count = countClosestMines(x, y, data.fieldArray, data.fieldInGameSize);
  const curCell = document.querySelector(`[data-ij="${x}-${y}"]`);
  const size = +data.fieldInGameSize.slice(-2);

  if (!curCell.classList.contains("cell_open")) {
    data.openCellCount++;
    updateInfoMenu(
      data.fieldInGameSize,
      data.openCellCount,
      data.minesInGameNumber,
      data.isSoundOn,
      data.clicks
    );
    curCell.classList.add("cell_open");
    curCell.innerHTML = count > 0 ? count : "";
    curCell.dataset.num = count;
  }
  if (!count) {
    for (let i = x - 1; i <= x + 1; i++) {
      for (let j = y - 1; j <= y + 1; j++) {
        if (i >= 0 && j >= 0 && i < size && j < size) {
          const foundCell = document.querySelector(`[data-ij="${i}-${j}"]`);
          if (!foundCell.classList.contains("cell_open")) {
            openCell(i, j, data);
          }
        }
      }
    }
  }
};

const cellHandler = (ij, data) => {
  const ijArr = ij.split("-");
  const x = +ijArr[0];
  const y = +ijArr[1];

  if (data.fieldArray[x][y].isMine) {
    finishGame(false, data.isSoundOn);
  } else {
    const curCell = document.querySelector(`[data-ij="${x}-${y}"]`);

    if (!curCell.classList.contains("cell_open")) {
      soundAudio(false, data.isSoundOn);
      data.clicks++;

      openCell(x, y, data);
    }
  }
};

export default cellHandler;
