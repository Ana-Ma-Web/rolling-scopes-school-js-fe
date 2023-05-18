import finishGame from "../finishGame";
import restCellsCount from "./restCellsCount";

const updateRestCells = (
  fieldInGameSize,
  openCellCount,
  minesInGameNumber,
  isSoundOn
) => {
  const infoMessage = document.querySelector(".info__message");
  const count = restCellsCount(
    fieldInGameSize,
    openCellCount,
    minesInGameNumber
  );

  infoMessage.innerHTML = `You have to open ${count} more cells 👀`;

  if (count === 0) {
    finishGame("win", isSoundOn);
    infoMessage.innerHTML = `🎊 You have won!!! 🥳🎉`;
  }
};

export default updateRestCells;
