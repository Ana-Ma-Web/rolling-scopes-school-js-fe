import data from "../data/data";
import finishGame from "../finishGame";
import countTime from "./countTime";
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
      infoMessage.innerHTML = `🚨 "Game over 🎃 Try again" ⚠️`;
    } else {
      infoMessage.innerHTML = `🎊 "Hooray! 🥳 You found all mines in ${countTime(
        data.timeStart,
        data.timeEnd
      )} seconds and ${data.clicks} moves!" 🎉`;
    }
  } else {
    infoMessage.innerHTML = `You have to open ${count} more cells 👀`;
  }
  if (count === 0) {
    finishGame("win", isSoundOn);
  }
};

export default updateRestCells;
