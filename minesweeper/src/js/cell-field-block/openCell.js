import updateInfoMenu from "../info-block/updateInfoMenu";
import countClosestMines from "./countClosestMines";

const openCell = (x, y, data) => {
  const count = countClosestMines(
    x,
    y,
    data.cellsAtField,
    data.fieldInGameSize
  );
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

    data.cellsAtField[x][y].isOpen = true;
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

export default openCell;
