import flagAllMineCells from "./cell-field-block/flagAllMineCells";
import printMines from "./cell-field-block/printMines";
import data from "./data/data";
import soundAudio from "./soundAudio";

const finishGame = (isWin, isSoundOn) => {
  const infoMessage = document.querySelector(".info__message");
  if (isWin) {
    soundAudio("win", isSoundOn);
    flagAllMineCells();
    infoMessage.innerHTML = `🎊 You have won!!! 🥳🎉`;
  } else {
    data.isLose = true;
    soundAudio("lose", isSoundOn);
    infoMessage.innerHTML = `🚨 You lose! 🎃⚠️`;
    printMines();
  }
  data.isDisabled = true;
};

export default finishGame;
