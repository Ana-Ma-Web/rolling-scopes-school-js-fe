import finishGame from "../finishGame";
import restCellsCount from "./restCellsCount";

const updateRestCells = (
  fieldInGameSize,
  openCellCount,
  minesInGameNumber,
  isSoundOn
) => {
  const targetElement = document.querySelector(".info__rest-cells");
  const count = restCellsCount(
    fieldInGameSize,
    openCellCount,
    minesInGameNumber
  );

  const restCells = document.createElement("div");
  restCells.innerHTML = `Rest Cells: ${count}`;

  targetElement.innerHTML = "";
  targetElement.append(restCells);
  if (count === 0) {
    finishGame("win", isSoundOn);
  }
};

export default updateRestCells;
