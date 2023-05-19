import data from "../data/data";
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

  if (data.isDisabled) {
    if (data.isLose) {
      infoMessage.innerHTML = `🚨 You lose! 🎃⚠️`;
    } else {
      infoMessage.innerHTML = `🎊 You have won!!! 🥳🎉`;
    }
  } else {
    infoMessage.innerHTML = `You have to open ${count} more cells 👀`;
  }

  if (count === 0) {
    finishGame("win", isSoundOn);
  }
};

export default updateRestCells;
