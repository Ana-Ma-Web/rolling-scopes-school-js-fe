import finishGame from "../finishGame";
import soundAudio from "../soundAudio";
import openCell from "../cell-field-block/openCell";

const cellHandler = (ij, data) => {
  const ijArr = ij.split("-");
  const x = +ijArr[0];
  const y = +ijArr[1];

  if (data.cellsAtField[x][y].isMine) {
    finishGame(false, data.isSoundOn);
  } else {
    const curCell = document.querySelector(`[data-ij="${x}-${y}"]`);

    console.log(data.cellsAtField);

    if (!data.cellsAtField[x][y].isOpen) {
      soundAudio(false, data.isSoundOn);
      data.clicks++;

      openCell(x, y, data);
    }
  }
};

export default cellHandler;
