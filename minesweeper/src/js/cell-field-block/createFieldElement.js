const createFieldElement = (data) => {
  const fieldSize = +data.fieldInGameSize.slice(-2);
  const sizeClass = "game-field_size-" + fieldSize;

  const gameField = document.createElement("div");
  gameField.className = "game-field " + sizeClass;

  for (let i = 0; i < fieldSize; i++) {
    for (let j = 0; j < fieldSize; j++) {
      const cellNode = document.createElement("button");
      const cellObj = data.cellsAtField[i][j];
      cellNode.classList.add("cell", "btn", "btn_fill");
      if (cellObj.isFlag) {
        cellNode.classList.add("cell_flag");
      }
      if (cellObj.isOpen) {
        cellNode.classList.add("cell_open");
        cellNode.innerHTML = cellObj.text ? cellObj.text : "";
        cellNode.dataset.num = +cellObj.text;
      }
      if (data.isDisabled) {
        if (cellObj.isMine) {
          cellNode.classList.add("cell_mine");
        }
        if (cellObj.isExpl) {
          cellNode.classList.add("cell_expl");
        }
      }
      cellNode.dataset.ij = i + "-" + j;
      gameField.append(cellNode);
    }
  }

  return gameField;
};

export default createFieldElement;
