import flagAllMineCells from "./cell-field-block/flagAllMineCells";
import printMines from "./cell-field-block/printMines";
import createMessage from "./data/createMessage";
import data from "./data/data";
import soundAudio from "./soundAudio";

const finishGame = (isWin, isSoundOn) => {
  const infoMessage = document.querySelector(".message");
  const messageText = createMessage();

  if (isWin) {
    soundAudio("win", isSoundOn);
    flagAllMineCells();
    infoMessage.innerHTML = messageText.win;
  } else {
    data.isLose = true;
    soundAudio("lose", isSoundOn);
    infoMessage.innerHTML = messageText.lose;
    printMines();
  }
  data.isDisabled = true;
  data.isPaused = true;
};

export default finishGame;
