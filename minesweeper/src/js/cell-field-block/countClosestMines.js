const countClosestMines = (x, y, cellsAtField, fieldSize) => {
  let count = 0;
  const size = +fieldSize.slice(-2);
  for (let i = x - 1; i <= x + 1; i++) {
    for (let j = y - 1; j <= y + 1; j++) {
      if (i >= 0 && j >= 0 && i < size && j < size) {
        if (cellsAtField[i][j].isMine) count++;
      }
    }
  }

  return count;
};

export default countClosestMines;
