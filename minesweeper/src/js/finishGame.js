import flagAllMineCells from "./cell-field-block/flagAllMineCells";
import printMines from "./cell-field-block/printMines";
import data from "./data/data";
import countTime from "./info-block/countTime";
import soundAudio from "./soundAudio";

const finishGame = (isWin, isSoundOn) => {
  const infoMessage = document.querySelector(".message");
  if (isWin) {
    soundAudio("win", isSoundOn);
    flagAllMineCells();
    infoMessage.innerHTML = `🎊&nbsp;"Hooray!&nbsp;🥳 You&nbsp;found&nbsp;all&nbsp;mines in!&nbsp;${countTime(
      data.timeStart,
      data.timeEnd
    )}!&nbsp;seconds and!&nbsp;${data.clicks}!&nbsp;moves!" 🎉`;
  } else {
    data.isLose = true;
    soundAudio("lose", isSoundOn);
    infoMessage.innerHTML = `🚨&nbsp;"Game&nbsp;over 🎃&nbsp;Try&nbsp;again"&nbsp;⚠️`;
    printMines();
  }
  data.isDisabled = true;
};

export default finishGame;
