import finishGame from "../finishGame";
import restCellsCount from "./restCellsCount";

const updateInfoMenu = (
  fieldInGameSize,
  openCellCount,
  minesInGameNumber,
  isSoundOn,
  clicks
) => {
  const updateRestCells = () => {
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

  const updateClicks = () => {
    const targetElement = document.querySelector(".info__clicks");

    targetElement.innerHTML = `Clicks: ${clicks}`;
  };

  updateClicks();
  updateRestCells(fieldInGameSize, openCellCount, minesInGameNumber);
};

export default updateInfoMenu;
