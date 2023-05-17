const setMines = (data, ij) => {
  let size = +data.fieldInGameSize.slice(-2);
  let minesCount = data.minesInGameNumber;

  const ijArr = ij.split("-");
  const curX = +ijArr[0];
  const curY = +ijArr[1];

  while (minesCount > 0) {
    const x = Math.floor(Math.random() * size);
    const y = Math.floor(Math.random() * size);

    data.fieldArray.forEach((elX, indexX) => {
      if (indexX === x) {
        elX.forEach((elY, indexY) => {
          if (indexY === y && !(curX === x && curY === y)) {
            if (elY.isMine === false) {
              elY.isMine = true;
              minesCount--;
            }
          }
        });
      }
    });
  }
};

export default setMines;
