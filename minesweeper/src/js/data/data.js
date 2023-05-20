import createDefaultData from "./createDefaultData";

let data = localStorage.getItem("minesweeper-game-data")
  ? JSON.parse(localStorage.getItem("minesweeper-game-data"))
  : createDefaultData();

export default data;
