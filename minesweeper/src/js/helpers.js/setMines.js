const setMines = (data, ij) => {
  let size = +data.fieldSize.slice(-2);
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
            const cellWithMine = document.querySelector(
              `[data-ij="${x}-${y}"]`
            );
            if (!cellWithMine.classList.contains("cell_mine")) {
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
