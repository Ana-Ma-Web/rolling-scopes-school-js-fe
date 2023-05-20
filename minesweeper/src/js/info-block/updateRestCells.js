import createMessage from "../data/createMessage";
import data from "../data/data";
import finishGame from "../finishGame";
import restCellsCount from "./restCellsCount";

const updateRestCells = (isSoundOn) => {
  const infoMessage = document.querySelector(".message");
  const messageText = createMessage();
  const count = restCellsCount(
    data.fieldInGameSize,
    data.openCellCount,
    data.minesInGameNumber
  );

  if (data.isDisabled) {
    if (data.isLose) {
      infoMessage.innerHTML = messageText.lose;
    } else {
      infoMessage.innerHTML = messageText.win;
    }
  } else {
    infoMessage.innerHTML = messageText.default;
  }
  if (count === 0) {
    finishGame("win", isSoundOn);
  }
};

export default updateRestCells;
