const rerenderField = (data) => {
  const gameField = document.querySelector(".game-field");
  gameField.innerHTML = "";

  switch (data.fieldInGameSize) {
    case "easy 10x10":
      gameField.classList.add("game-field_easy");
      gameField.classList.remove("game-field_medium");
      gameField.classList.remove("game-field_hard");
      data.fieldArray = [];
      for (let i = 0; i < 10; i++) {
        data.fieldArray.push([]);
        for (let j = 0; j < 10; j++) {
          data.fieldArray[i].push({ isMine: false, ij: i + "-" + j });
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
      data.fieldArray = [];
      for (let i = 0; i < 15; i++) {
        data.fieldArray.push([]);
        for (let j = 0; j < 15; j++) {
          data.fieldArray[i].push({ isMine: false, ij: i + "-" + j });
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
      data.fieldArray = [];
      for (let i = 0; i < 25; i++) {
        data.fieldArray.push([]);
        for (let j = 0; j < 25; j++) {
          data.fieldArray[i].push({ isMine: false, ij: i + "-" + j });
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
