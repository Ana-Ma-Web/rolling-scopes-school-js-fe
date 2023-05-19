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
  const infoMessage = document.querySelector(".message");
  const count = restCellsCount(
    fieldInGameSize,
    openCellCount,
    minesInGameNumber
  );
  if (data.isDisabled) {
    if (data.isLose) {
      infoMessage.innerHTML = `🚨&nbsp;Game&nbsp;over 🎃&nbsp;Try&nbsp;again&nbsp;⚠️`;
    } else {
      infoMessage.innerHTML = `🎊&nbsp;Hooray!&nbsp;🥳 
      You&nbsp;found&nbsp;all&nbsp;mines in&nbsp;${countTime(
        data.time
      )}&nbsp;seconds and&nbsp;${data.clicks}&nbsp;moves! 🎉`;
    }
  } else {
    infoMessage.innerHTML = `You have to open ${count}&nbsp;more&nbsp;cells&nbsp;👀`;
  }
  if (count === 0) {
    finishGame("win", isSoundOn);
  }
};

export default updateRestCells;
