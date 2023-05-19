import flagAllMineCells from "./cell-field-block/flagAllMineCells";
import printMines from "./cell-field-block/printMines";
import data from "./data/data";
import countTime from "./info-block/countTime";
import soundAudio from "./soundAudio";

const finishGame = (isWin, isSoundOn) => {
  const infoMessage = document.querySelector(".info__message");
  if (isWin) {
    soundAudio("win", isSoundOn);
    flagAllMineCells();
    infoMessage.innerHTML = `🎊 "Hooray! 🥳 You found all mines in ${countTime(
      data.timeStart,
      data.timeEnd
    )} seconds and ${data.clicks} moves!" 🎉`;
  } else {
    data.isLose = true;
    soundAudio("lose", isSoundOn);
    infoMessage.innerHTML = `🚨 "Game over 🎃 Try again" ⚠️`;
    printMines();
  }
  data.isDisabled = true;
};

export default finishGame;
