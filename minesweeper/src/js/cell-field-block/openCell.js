import updateInfoMenu from "../info-block/updateInfoMenu";
import countClosestMines from "./countClosestMines";

const openCell = (x, y, data) => {
  const count = countClosestMines(
    x,
    y,
    data.cellsAtField,
    data.fieldInGameSize
  );
  const cellObj = data.cellsAtField[x][y];
  const cellNode = document.querySelector(`[data-ij="${x}-${y}"]`);
  const size = +data.fieldInGameSize.slice(-2);

  if (!cellNode.classList.contains("cell_open")) {
    data.openCellCount++;
    updateInfoMenu(
      data.fieldInGameSize,
      data.openCellCount,
      data.minesInGameNumber,
      data.isSoundOn,
      data.clicks
    );

    cellObj.isOpen = true;
    cellNode.classList.add("cell_open");
    cellNode.innerHTML = count > 0 ? count : "";
    cellNode.dataset.num = count;
    cellObj.text = count;
  }
  if (!count) {
    for (let i = x - 1; i <= x + 1; i++) {
      for (let j = y - 1; j <= y + 1; j++) {
        if (i >= 0 && j >= 0 && i < size && j < size) {
          const foundCell = document.querySelector(`[data-ij="${i}-${j}"]`);
          if (
            !foundCell.classList.contains("cell_open") &&
            !foundCell.classList.contains("cell_flag")
          ) {
            openCell(i, j, data);
          }
        }
      }
    }
  }
};

export default openCell;
