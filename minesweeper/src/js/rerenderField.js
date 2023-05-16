const rerenderField = (fieldSize, fieldArray) => {
  const gameField = document.querySelector(".game-field");
  gameField.innerHTML = "";

  switch (fieldSize) {
    case "easy 10x10":
      gameField.classList.add("game-field_easy");
      gameField.classList.remove("game-field_medium");
      gameField.classList.remove("game-field_hard");
      fieldArray = [];
      for (let i = 0; i < 10; i++) {
        fieldArray.push([]);
        for (let j = 0; j < 10; j++) {
          fieldArray[i].push({ isMine: false, ij: i + "-" + j });
          const cell = document.createElement("button");
          cell.classList.add("cell");
          cell.classList.add("btn");
          cell.classList.add("btn_fill");
          cell.dataset.ij = i + "-" + j;
          gameField.append(cell);
        }
      }
      break;

    case "medium 15x15":
      gameField.classList.add("game-field_medium");
      gameField.classList.remove("game-field_easy");
      gameField.classList.remove("game-field_hard");
      for (let i = 0; i < 15; i++) {
        fieldArray.push([]);
        for (let j = 0; j < 15; j++) {
          fieldArray[i].push([]);
          const cell = document.createElement("button");
          cell.classList.add("cell");
          cell.classList.add("btn");
          cell.classList.add("btn_fill");
          cell.dataset.ij = i + "-" + j;
          gameField.append(cell);
        }
      }
      break;

    case "hard 25x25":
      gameField.classList.add("game-field_hard");
      gameField.classList.remove("game-field_medium");
      gameField.classList.remove("game-field_easy");
      for (let i = 0; i < 25; i++) {
        fieldArray.push([]);
        for (let j = 0; j < 25; j++) {
          fieldArray[i].push([]);
          const cell = document.createElement("button");
          cell.classList.add("cell");
          cell.classList.add("btn");
          cell.classList.add("btn_fill");
          cell.dataset.ij = i + "-" + j;
          gameField.append(cell);
        }
      }
      break;

    default:
      break;
  }

  return gameField;
};
export default rerenderField;
